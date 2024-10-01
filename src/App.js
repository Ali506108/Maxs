import React, { useEffect, useRef } from 'react';
import { load } from '@2gis/mapgl';
import Modal from 'react-modal';
import Slider from 'react-slick';

import './App.css';

// Удален локальный импорт видеофайла
// import videoFile from './photo/MS-SILVER-4.mp4'; // Ensure this file path is correct

// URL вашего видеофайла в облачном хранилище
const VIDEO_URL = 'https://storage.googleapis.com/max-kz-1/Untitled%20%E2%80%91%20Made%20with%20FlexClip.mp4';

// Определите константы для внешних URL изображений
const IMAGES = {
  logo: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258817/MaxSecend/kxy3zqcsgrag5sooeexs.png',
  
  // Silver Images
  silver1: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727763421/Maximus_2.0/cplyaklw523zhbwiosdc.png',
  silver2: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258912/MaxSecend/mf9zh5wbmjbrj4virvtv.jpg',
  silver3: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692415/Maximus_2.0/cuav8fy6vmht1jhld9pk.jpg',
  silver4: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258912/MaxSecend/oe7cv0jiskqrx5ke0hha.jpg',
  
  // Gold Images
  gold1: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692416/Maximus_2.0/bb9ee5jfesvxfe6ckq9d.jpg',
  gold2: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258912/MaxSecend/mf9zh5wbmjbrj4virvtv.jpg',
  gold3: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692416/Maximus_2.0/hf52kx9ngrrihyy6lias.jpg',
  gold4: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692415/Maximus_2.0/ri86nhs1fzldkuyovpn0.jpg',
  // https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692415/Maximus_2.0/ri86nhs1fzldkuyovpn0.jpg
  dia: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727764210/Maximus_2.0/sjmnylswwezl91ow9atb.jpg',
  dia2:'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692418/Maximus_2.0/s6evxzhzr0gh70wudxow.jpg',
  dia3:'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692418/Maximus_2.0/qvlzt6rz3v8aagvhis1n.jpg',
  dia4:'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692420/Maximus_2.0/nmamnbk7pfyfbucql4a9.jpg',
  // Standard Images
  st1: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258913/MaxSecend/rsico0x5aqxt8svbwlzu.jpg',
  st2: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258912/MaxSecend/izmqm4i1uyhl0vz4ey3v.jpg',
  st3: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258913/MaxSecend/pmlshp34sezptxgw5man.jpg',
  
  sap1: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692417/Maximus_2.0/fkpsogavofspf0haazis.jpg',
  sap2: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692419/Maximus_2.0/sol6mfkaleqijwifaj9n.jpg',
  sap3:'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727692415/Maximus_2.0/zwqsihos806naxr6rs6n.jpg',
  sap4:'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727764210/Maximus_2.0/sjmnylswwezl91ow9atb.jpg',
  
  // Lux Images
  lux: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258819/MaxSecend/d4x3n10wcf8jwffe8x1x.jpg',
  lux2: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258819/MaxSecend/y2kiuysxxctbih4ikmwc.jpg',
  lux32: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258820/MaxSecend/cfhkg6smqymuxwiuvaic.jpg',
  
  // Delux Images
  delux: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258784/MaxSecend/jfnifp5iz6tywatynbik.jpg',
  delux2: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258784/MaxSecend/ajrrlvkljxmxa8czivvk.jpg',
  delux3: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258786/MaxSecend/x9hyevp4aojdmn0vx4jn.jpg',
  
  // Premium Images
  x1: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258915/MaxSecend/wyof83enfhlshfkpmjbc.jpg',
  x2: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258915/MaxSecend/ke4vgpjfzlup4kc3gnqi.jpg',
  x3: 'https://res.cloudinary.com/da0o3gnfw/image/upload/v1727258915/MaxSecend/itd5mbpzgpbr7j73u4az.jpg',
};

// Деструктуризация URL изображений для удобства доступа
const {
  logo,
  silver1,
  silver2,
  silver3,
  silver4,
  gold1,
  gold2,
  gold3,
  gold4,
  dia,
  dia2,
  dia3,
  dia4,
  sap2,
  sap3,
  sap4,
  st1,
  st2,
  st3,
  sap1,
  lux,
  lux2,
  lux32,
  delux,
  delux2,
  delux3,
  x1,
  x2,
  x3,
} = IMAGES;

// Установите корневой элемент для Modal
Modal.setAppElement('#root');

// Компоненты для стрелок слайдера
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '10px' }}
      onClick={onClick}
    />
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '10px' }}
      onClick={onClick}
    />
  );
};

const App = () => {
  const [activeSection, setActiveSection] = React.useState(null);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalImages, setModalImages] = React.useState([]);
  const [modalText, setModalText] = React.useState([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const mapContainerRef1 = useRef(null);
  const mapContainerRef2 = useRef(null);

  // Координаты для карт
  const coordinates = {
    arykova: {
      center: [76.9637430575062, 43.27123148797727],
      marker: [76.9637430575062, 43.27123148797727],
    },
    bestuzheva: {
      center: [76.97040560425366, 43.27971642821492],
      marker: [76.97040560425366, 43.27971642821492],
    },
  };

  // Функция для загрузки карты
  const loadMap = (containerRef, center, markerCoordinates) => {
    if (!containerRef.current) return;

    load().then((mapgl) => {
      const map = new mapgl.Map(containerRef.current, {
        center: center,
        zoom: 13,
        key: '69b6b42e-0669-456d-a218-28bb6f2b3b2a', // Замените на ваш API ключ
      });

      // Создайте маркер по указанным координатам
      new mapgl.Marker(map, {
        coordinates: markerCoordinates, // Используйте переданные координаты
      }).on('click', () => {
        alert('Вы кликнули по маркеру!');
      });
    });
  };

  // Загрузка карты при изменении activeSection
  useEffect(() => {
    if (activeSection === 'arykova' && mapContainerRef1.current) {
      loadMap(mapContainerRef1, coordinates.arykova.center, coordinates.arykova.marker);
    } else if (activeSection === 'bestuzheva' && mapContainerRef2.current) {
      loadMap(mapContainerRef2, coordinates.bestuzheva.center, coordinates.bestuzheva.marker);
    }
  }, [activeSection, coordinates]);

  // Обработка кликов по навигационным ссылкам
  const handleLinkClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  // Открыть модальное окно с изображениями и текстом
  const openModal = (images, bText) => {
    setModalImages(images);
    setModalText(bText);
    setModalIsOpen(true);
  };

  // Закрыть модальное окно
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Обработка клика по WhatsApp
  const handleWhatsAppClick = () => {
    const phoneNumber = '77075006827'; // Убрано '+' для ссылки WhatsApp
    const message = 'Здравствуйте, мне нужна консультация';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Обработка клика по телефону
  const handleClick = () => {
    const phone = '+7 707 500 6827';
    window.location.href = `tel:${phone}`;
    setIsMenuOpen(false);
  };

  // Данные о сауне с URL изображений и текстами
  const saunaData = {
    arykova: [
      {
        slider: [silver1, silver2, silver3, silver4],
        img: silver1,
        text: 'Silver 1',
        bText: [
          'Вместимость сауны до 6 человек.',
          'Бассейн',
          '-Караоке',
          '-Настольный футбол',
          '-Цифровое TV',
          '-Две Комнаты отдыха',
          '-Парная',
          '-Массажный стол',
        ],
      },
      {
        slider: [gold1, gold2, gold3, gold4],
        img: gold1,
        text: 'Gold 2',
        bText: [
          'Вместимость сауны до 10 человек.',
          '-Бассейн и душ',
          '-Караоке',
          '-Настольный футбол',
          '-Цифровое TV',
          '-Две Комнаты отдыха',
          '-Парная',
          '-Массажный стол',
        ],
      },
      {
        slider: [dia, dia2, dia3 , dia4],
        img: dia,
        text: 'Diamond 3',
        bText: [
          'Вместимость сауны до 10 человек.',
          '-Бассейн и душ',
          '-Караоке',
          '-Настольный футбол',
          '-Цифровое TV',
          '-Две Комнаты отдыха',
          '-Парная',
          '-Массажный стол',
        ],
      },
      {
        slider: [sap1 , sap2 ,sap3 ,sap4],
        img: sap1,
        text: 'Sapfir 4',
        bText: [
          'Вместимость сауны до 10 человек.',
          '-Бассейн и душ',
          '-Караоке',
          '-Настольный футбол',
          '-Цифровое TV',
          '-Две Комнаты отдыха',
          '-Парная',
          '-Массажный стол',
        ],
      },
    ],
    bestuzheva: [
      {
        slider: [st1, st2, st3],
        img: st1,
        text: 'Сауна Стандарт 1',
        bText: [
          'Вместимость сауны до 6 человек.',
          '-Бассейн',
          '-Караоке',
          '-Настольный футбол',
          '-Цифровое TV',
          '-Комната отдыха',
          '-Парная',
          '-Массажный стол',
        ],
      },
      {
        slider: [lux, lux2, lux32],
        img: lux,
        text: 'Сауна Делюкс 2',
        bText: [
          'Вместимость сауны до 10 человек.',
          '-Бильярд',
          '-Бассейн и душ',
          '-Караоке',
          '-Настольный футбол',
          '-Цифровое TV',
          '-Две Комнаты отдыха',
          '-Парная',
          '-Массажный стол',
        ],
      },
      {
        slider: [delux, delux2, delux3],
        img: delux,
        text: 'Сауна Люкс',
        bText: [
          'Вместимость сауны до 10 человек.',
          '-Бильярд',
          '-Профессиональный караоке',
          '-Бассейн и душ',
          '-Цифровое TV',
          '-Комната отдыха',
          '-Массажный стол',
          '-Парная',
        ],
      },
      {
        slider: [x1, x2, x3],
        img: x1,
        text: 'Сауна Премиум',
        bText: [
          'Вместимость сауны до 10 человек.',
          '-Аэрохоккей',
          '-Караоке',
          '-Бассейн и душ',
          '-Цифровое TV',
          '-Комната отдыха',
          '-Массажный стол',
          '-Парная',
          '-Банкетный стол',
        ],
      },
    ],
  };

  // Компонент блока сауны
  const SaunaBlock = ({ img, text, onClick }) => (
    <div className="sauna-block">
      <div className="sauna-photo" onClick={onClick}>
        <img src={img} alt={text} />
        <div className="sauna-photo-text">{text}</div>
      </div>
    </div>
  );

  // Отображение секции сауны на основе activeSection
  const renderSaunaSection = (section) => (
    <div>
      <div className="sauna-blocks">
        {saunaData[section].map(({ slider, img, text, bText }) => (
          <SaunaBlock
            key={text}
            img={img}
            text={text}
            onClick={() => openModal(slider, bText)}
          />
        ))}
      </div>
      <div className="blactob">
        <div className="map-container" ref={section === 'arykova' ? mapContainerRef1 : mapContainerRef2}></div>
        <div className="contact-info">
          <a href="https://wa.me/770202538773" target="_blank" rel="noopener noreferrer" className="phone-number">
            <h1>+7 707 500 6827</h1>
          </a>
          <div className="address">
            {section === 'arykova' && (
              <h2 className="address_num">Адрес филиала Арыкова: Улица Арыковой, 54</h2>
            )}
            {section === 'bestuzheva' && (
              <h2 className="address_num">Адрес филиала Бестужева: Улица Бестужева, 6</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Настройки для слайдера
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="App">
      {/* Секция заголовка (скрыта, когда модальное окно открыто) */}
      {!modalIsOpen && (
        <div className="head">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="#section1" onClick={() => handleLinkClick('arykova')}>Филиал Арыкова</a>
            <a href="#section2" onClick={() => handleLinkClick('bestuzheva')}>Филиал Бестужева</a>
            <a href="https://maximus.com.kz/" onClick={() => handleLinkClick(null)}>Login</a>
            <a href="#contact" onClick={() => handleClick()}>Связаться</a>
          </nav>
          <div
            className={`burger ${isMenuOpen ? 'toggle' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>
      )}

      {/* Секция заголовка с видео на заднем плане */}
      <header className="App-header">
        <video autoPlay loop muted playsInline className="background-video">
          <source src={VIDEO_URL} type="video/mp4" />
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
        <div className="content">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="text-heading">
            Добро пожаловать <code>Maximus</code> 8 саун комфорт-класса.
          </p>
          <h1 className="animated-heading">Расслабьтесь в нашей роскошной сауне. <br/> Забудьте о стрессах и насладитесь теплом.</h1>
          </div>
      </header>

      {/* Секции сауны */}
      <section className="sauna-section">
        {activeSection === 'arykova' && renderSaunaSection('arykova')}
        {activeSection === 'bestuzheva' && renderSaunaSection('bestuzheva')}
      </section>

      {/* Модальное окно для слайдера изображений и деталей */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-inner">
          <button onClick={closeModal} className="butclose">✖ Close</button>
          <div className="model-images-i">
            <Slider {...settings}>
              {modalImages.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Slide ${index}`} className="modal-image" />
                </div>
              ))}
            </Slider>
          </div>
          <div className="modelContents">
            <ul className="modal-text">
              {modalText.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button onClick={handleWhatsAppClick} className="whatsapp-button">
              <i className="fab fa-whatsapp"></i> Связаться через WhatsApp
            </button>
            <button onClick={handleClick} className="whatsapp-button">
              <i className="fab fa-phone"></i> Связаться
            </button>
          </div>
        </div>
      </Modal>


      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="footer-contact">
            <a href="https://wa.me/770202538773" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> +7 707 500 6827
            </a>
            <br />
            <a href="mailto:info@maximus.com.kz">info@maximus.com.kz</a>
          </div>
          <div className="footer-social">
            {/* Добавьте ссылки на социальные сети, если необходимо */}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Maxsimus. Все права защищены.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
