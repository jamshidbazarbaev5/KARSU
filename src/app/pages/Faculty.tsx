import Image from "next/image";
import Link from "next/link";

const Faculty = () => {
  const departments = [
    "Археология",
    "Өзбекстан ҳәм Қарақалпақстан тарийхы",
    "Социаллық пәнлер",
    "Педогогика ҳәм психология",
  ];

  const socialLinks = [
    { icon: "fa-square-facebook", url: "#" },
    { icon: "fa-instagram", url: "#" },
    { icon: "fa-x-twitter", url: "#" },
    { icon: "fa-linkedin", url: "#" },
  ];

  return (
    <>
      <div className="header-logo-div">
        <div className="header-logo-mini">
          <div className="header-logo-uni">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </div>
          <div className="header-logo-uni-name">
            <a 
              href="/"
              className="header-logo-uni-name-span"
            >
              КАРАКАЛПАКСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ
            </a>
          </div>
        </div>
      </div>
      <main className="faculty">
        <div className="container">
          <div className="faculty-logo">
            <h1>Тарийх факультети</h1>
          </div>

          <div className="faculty-block">
            <div className="faculty-block-pro">
              <div className="faculty-block-pro-img">
                <Image
                  src="/main.png"
                  alt="Dean's photo"
                  width={300}
                  height={400}
                  priority
                />
              </div>

              <div className="faculty-block-pro-title">
                <div className="faculty-block-pro-title-info">
                  <h2 className="faculty-course">Тарийх факультети деканы:</h2>
                  <p className="faculty-name">Реймов Ахмед Мамбеткаримович</p>
                </div>

                <div className="faculty-block-pro-title-contact">
                  <div className="faculty-number">
                    <p>
                      <i className="fa-solid fa-phone"></i>
                      Phone:
                    </p>
                    <Link href="tel:+99897357817">+99897 357 78 17</Link>
                  </div>
                  <div className="faculty-email">
                    <p>
                      <i className="fa-solid fa-envelope"></i>
                      Email:
                    </p>
                    <Link href="mailto:s_salamatsu@mail.ru">
                      s_salamatsu@mail.ru
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-block-text">
              <div className="faculty-block-text-links">
                <h4>Факультеттеги кафедралар:</h4>
                <ul>
                  {departments.map((dept, index) => (
                    <li key={index}>
                      <Link href="#">{dept}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="faculty-block-text-info">
                <h4>Тарийх факультети тарийхы</h4>
                <p>
                  Қарақалпақ мәмлекетлик университетиниң ашылыўы менен 1976 жылы
                  Тарийх-география факультети шөлкемлестирилип 1977-1978-оқыў
                  жылларында Тарийх-география факультети қурамында Ҳуқықтаныў
                  бөлими ашылды. 1993 жылы Юридика ҳәм Тарийх факультетлери
                  болып екиге бөлинеди ҳәм Юридика факультети шөлкемлестириледи.
                  1996 жылы Юридика – тарийх факультети болып қайта дүзиледи.
                  Сол ўақытта факультетте 5 кафедра болып соннан 3 кафедра
                  юриспруденция тəлим бағдары бойынша, 2 кафедра тарийх тəлим
                  бағдары бойынша бакалавр ҳәм магистрантларды таярлай баслады.
                  2003 жылы тарийх ҳәм юридика факультетлери өз-алдына қайтадан
                  бөлек факультет болып қәнигеликлер таярлай баслады. 2011 –
                  жылдан баслап Тарийх ҳәм ҳуқық факультети болып қайта дүзилип
                  бүгинги күнге шекем 4 кафедра жумыс алып барды. 2019 жылы
                  тарийх ҳәм юридика факультетлери өз-алдына қайтадан бөлек
                  факультет болып қәнигеликлер таярлай баслады. «Археология»,
                  «Өзбекстан ҳәм Қарақалпақстан тарийхы», «Социаллық пәнлер» ҳәм
                  «Педагогика» кафедраларында ҳәзирги күнде 3 илим докторы, 21
                  илим кандидатлары ҳәм доцентлер, 31 ассистент оқытыўшылар оқыў
                  ҳәм илимий педагогикалық жумыс алып бармақта.
                </p>
              </div>

              <div className="faculty-block-text-social">
                {socialLinks.map((social, index) => (
                  <Link href={social.url} key={index}>
                    <i className={`fa-brands ${social.icon}`}></i>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Faculty;
