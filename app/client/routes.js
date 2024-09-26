const express = require('express');
const passport = require('passport');
const router = express.Router();
const XLSX = require('xlsx');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const Client = require('./Client');
const {
    createClient,
    getAllClients,
    getClientById,
    updateClientById,
    deleteClientById
} = require('./controllers');

router.post('/clients', passport.authenticate('jwt', { session: false }), createClient);
router.get('/clients', passport.authenticate('jwt', { session: false }), getAllClients);
router.get('/clients/:id', passport.authenticate('jwt', { session: false }), getClientById);
router.put('/clients/:id', passport.authenticate('jwt', { session: false }), updateClientById);
router.delete('/clients/:id', passport.authenticate('jwt', { session: false }), deleteClientById);
const uploadOpts = {
  useTempFiles: true,
  tempFileDir: '/tmp/'
};

// Функция для очистки данных: убираем пробелы и преобразуем строки, состоящие только из пробелов, в null
const cleanData = (value) => {
  if (value) {
    const trimmedValue = value.toString().trim();
    return trimmedValue.length === 0 ? null : trimmedValue;
  }
  return null;
};
// Маршрут для загрузки Excel-файла
router.post('/upload', async (req, res) => {
  try {
    // const { excel } = req.body.excel;
    console.log(req.body.excel);
    const excel = req.body.excel;
    const resultArray = excel.split(',');
   
    const chunkedArray = []; // Массив для хранения подмассивов

    for (let i = 0; i < resultArray.length; i += 5) {
      const chunk = resultArray.slice(i, i + 5); // Создаем подмассив с 5 элементами
      chunkedArray.push(chunk); // Добавляем подмассив в общий массив
    }
        console.log(chunkedArray);



    // Проверяем, что файл был отправлен
    if (!excel) {
      return res.status(400).json({ msg: 'Файл не был отправлен' });
    }

    // Декодируем base64 в бинарные данные
    // const base64Data = excel.replace(/^data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/, "");
    // const buffer = Buffer.from(base64Data, 'base64');

    // Читаем Excel файл из буфера
    // const workbook = XLSX.read(buffer, { type: 'buffer' });
    // const sheetName = workbook.SheetNames[0]; // берем первый лист
    // const sheet = workbook.Sheets[sheetName];
    // const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Обрабатываем строки, заполняя отсутствующие значения null
    const rows = chunkedArray.map(row => {
      while (row.length < 5) {
        row.push(null); // Добавляем null для отсутствующих значений
      }
      return row;
    });

    // Проверка корректности данных перед записью
    const errors = [];
    const validRecords = [];

    for (const row of rows) {
      let [name, phone, email, birthday, gender] = row;
      console.log(row);

      // Убираем пробелы в начале и в конце строки и обрабатываем строки, состоящие только из пробелов
      name = cleanData(name);
      phone = cleanData(phone);
      email = cleanData(email);
      birthday = cleanData(birthday);
      gender = cleanData(gender);

      // Пропускаем запись, если все данные пусты
      if (name === null && phone === null && email === null && birthday === null && gender === null) {
        continue;
      }

      // Проверка на корректность формата gender
      if (gender !== null && gender !== undefined) {
        const genderLowerCase = gender.toLowerCase();
        if (genderLowerCase !== 'муж' && genderLowerCase !== 'жен') {
          errors.push(`Некорректный формат пола в строке: ${row}`);
          continue;
        }
      }

      // Проверка на корректность формата номера телефона
      if (phone !== null && phone !== undefined) {
        const phoneRegex = /^\+7\d{10}$/;
        if (!phoneRegex.test(phone)) {
          errors.push(`Некорректный формат телефона в строке: ${row}`);
          continue;
        }
      }

      // Проверка на корректность формата даты рождения
      if (birthday !== null && birthday !== undefined) {
        const birthdayRegex = /^(19|20)\d{2}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/;
        if (!birthdayRegex.test(birthday)) {
          errors.push(`Некорректный формат даты рождения в строке: ${row}`);
          continue;
        }
      }

      // Если данные корректны, добавляем их в массив validRecords
      validRecords.push({ name, phone, email, birthday, gender });
    }

    // Если есть ошибки, возвращаем их
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Файл содержит ошибки', errors });
    }

    // Запись корректных данных в базу данных
    try {
      for (const record of validRecords) {
        await Client.create(record);
      }
    } catch (dbError) {
      console.error(dbError);
      return res.status(500).json({
        message: 'Ошибка при записи данных в базу',
        error: 'Внутренняя ошибка сервера'
      });
    }

    // Если все записи были успешно обработаны и сохранены
    res.json({ message: 'Файл успешно обработан и данные сохранены', successfulRecords: validRecords });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Внутренняя ошибка сервера' });
  }
});


module.exports = router;
