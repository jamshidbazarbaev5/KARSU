'use client';

interface AdministratorProps {
  photo: string;
  title: string;
  study: string;
  name: string;
  phone: string;
  emails: string[];
  isMain?: boolean;
}

const AdministratorCard = ({ photo, title, study, name, phone, emails, isMain = false }: AdministratorProps) => {
  const baseClass = isMain ? 'administration-main' : 'administration-other';
  
  return (
    <div className={baseClass}>
      <div className={`${baseClass}-photo`}>
        <img 
          className={`${baseClass}-photo-img`}
          src={photo} 
          alt={name}
        />
      </div>
      <div className={`${baseClass}-info`}>
        <div className={`${baseClass}-title-div`}>
          <span className={`${baseClass}-title`}>{title}</span>
          <div className={`${baseClass}-line`}></div>
          <div className="administration-main-study">
            <span>{study}</span>
          </div>
        </div>
        <div className={`${baseClass}-other-info`}>
          <span className={`${baseClass}-name`}>{name}</span>
          <span className={`${baseClass}-phone`}>
            <span className="bold-span">Телефон</span> {phone}
          </span>
          {emails.map((email, index) => (
            <span key={index} className={`${baseClass}-email`}>
              <span className="bold-span">Email:</span> {email}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdministrationPage = () => {
  const administrators = [
    {
      photo: "/main.png",
      title: "Ректор, Доктор технических наук",
      study: "Lorem ipsum",
      name: "Реймов Ахмед Мамбеткаримович",
      phone: "(99861) 223-60-47",
      emails: ["r.axmed@exat.uz", "rector@karsu.uz"],
      isMain: true
    },
    {
      photo: "/second.png",
      title: "Проректор по учебной работе",
      study: "Lorem ipsum",
      name: "Дуйсенбаев Олимжон Исмаилович",
      phone: "(99861) 223-58-31",
      emails: ["qmu.oqiw@exat.uz", "o_duysenbayev1978@karsu.uz"]
    },
    {
      photo: "/third.png",
      title: "Проректор по науке и инновационных работ, доцент",
      study: "Lorem ipsum",
      name: "Турдымамбетов Изимбет Рахметович",
      phone: "(99861) 223-60-19",
      emails: ["qmu.ilim@exat.uz", "izimbet76@mail.ru"]
    },
    {
      photo: "/fourth.png",
      title: "Проректор по экономике и финансам, доцент",
      study: "Lorem ipsum",
      name: "Кудайбергенов Азамат Шамуратович",
      phone: "(99861) 223-59-13",
      emails: ["qmu.moliya@exat.uz", "Imam_2001@mail.ru"]
    },
    {
      photo: "/none.png",
      title: "Первый проректор по вопросам молодежи и духовно-просветительской работе",
      study: "Lorem ipsum",
      name: "Алауатдинов Сахабатдин Иниятдинович",
      phone: "(99861) 2235918",
      emails: ["qmu.manaviyat@exat.uz", "saxabatdin78@mail.ru"]
    }
  ];

  return (
    <div className="administration-page">
      <div className="administration-page-small">
        <div className="administration-page-title-div">
          <div className="administration-page-title">
            <span className="administration-page-title-span">АДМИНСТРАЦИЯ</span>
          </div>
        </div>
        <div className="all-administration-group">
          {administrators.map((admin, index) => (
            <AdministratorCard 
              key={index}
              {...admin}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdministrationPage;