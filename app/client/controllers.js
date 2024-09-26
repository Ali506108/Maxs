const Client = require('./Client')
const cleanData = (value) => {
  if (value) {
    const trimmedValue = value.toString().trim();
    return trimmedValue.length === 0 ? null : trimmedValue;
  }
  return null;
};
const createClient = async (req, res) => {
  try {
    let { name, phone , gender , birthday , email  } = req.body;  
    name = cleanData(name)
    phone = cleanData(phone)
    gender= cleanData(gender)
    birthday = cleanData(birthday)
    email = cleanData(email)
    // Проверка на корректность поля gender
    if (gender && !['муж', 'жен'].includes(gender.toLowerCase())) {
      return res.status(400).json({ message: 'Gender must be "муж" or "жен"' });
    }
  
    console.log(gender);

    if (birthday !== null && birthday !== undefined) {
      const birthdayRegex = /^(19|20)\d{2}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/;
      if (!birthdayRegex.test(birthday)) {
        return res.status(400).json({ message: 'Birthday must be in format YYYY.MM.DD and valid' });

      }
    }

    if(phone !== null && phone !== undefined){
      const phoneRegex =/^\+7\d{10}$/
      if(!phoneRegex.test(phone)){
        return res.status(400).json({ message: 'phone must be in format +77052342424 and valid' });

      }

    }
    const client = await Client.create({ name, phone ,  gender : gender.toLowerCase() , birthday , email  });
    res.status(201).json(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


const getAllClients = async (req, res) => {
    try {
      const clients = await Client.findAll({
        order: [['id', 'ASC']] 
      });
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateClientById = async (req, res) => {
  try {
   
    
    const client = await Client.findByPk(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    let { name, phone, gender, birthday, email } = req.body;
    name = cleanData(name)
    phone = cleanData(phone)
    gender= cleanData(gender)
    birthday = cleanData(birthday)
    email = cleanData(email)
    // Проверка на корректность поля gender
    if (gender && !['муж', 'жен'].includes(gender.toLowerCase())) {
      return res.status(400).json({ message: 'Gender must be "муж" or "жен"' });
    }

    if (birthday !== null && birthday !== undefined) {
      const birthdayRegex = /^(19|20)\d{2}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/;
      if (!birthdayRegex.test(birthday)) {
        return res.status(400).json({ message: 'Birthday must be in format YYYY.MM.DD and valid' });

      }
    }

    if(phone !== null && phone !== undefined){
      const phoneRegex =/^\+7\d{10}$/
      if(!phoneRegex.test(phone)){
        return res.status(400).json({ message: 'phone must be in format +7 and valid' });

      }

    }

    // Обновляем поля, если они переданы
    await client.update({
      name,
      phone,
      gender,
      birthday,
      email
    });

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const deleteClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      await client.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClientById,
    deleteClientById,


}