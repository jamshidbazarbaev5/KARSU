import Image from 'next/image'
import Link from 'next/link'

interface DocumentItem {
  id: number;
  type: string;
  date: string;
  name: string;
}

const Files = () => {
  // Sample data - you can replace this with actual data from an API
  const documents: DocumentItem[] = [
    {
      id: 1,
      type: "Odob axloq kodeksi",
      date: "2024, 19 Сентябрь",
      name: "Odob axloq kodeksi"
    },
    {
        id: 2,
        type: "Odob axloq kodeksi",
        date: "2024, 19 Сентябрь",
        name: "Odob axloq kodeksi"
      },

      {
        id: 3,
        type: "Odob axloq kodeksi",
        date: "2024, 19 Сентябрь",
        name: "Odob axloq kodeksi"
      },
      {
        id: 4,
        type: "Odob axloq kodeksi",
        date: "2024, 19 Сентябрь",
        name: "Odob axloq kodeksi"
      },
      {
        id: 5,
        type: "Odob axloq kodeksi",
        date: "2024, 19 Сентябрь",
        name: "Odob axloq kodeksi"
      },
    // ... add other documents
  ];

  return (
    <div className="navi-file">
      <div className="container">
        <div className="navi-file-title">
          <span className="nav-file-title-span">Normative Documents</span>
        </div>

        <div className="navi-flex">
          <div className="navi-flex-pagination">
            <div className="navi-file-all">
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Тип документа / кем выдан</th>
                    <th>Дата</th>
                    <th>Название документа</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td data-label="№">{doc.id}</td>
                      <td data-label="Тип документа / кем выдан">{doc.type}</td>
                      <td data-label="Дата">{doc.date}</td>
                      <td data-label="Название документа">{doc.name}</td>
                      <td data-label="Скачать">
                        <i className="fa-solid fa-download"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="news-page-numbers">
              <button className="news-page-numbers-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.9691 5.69757C10.664 5.39248 10.1694 5.39248 9.86427 5.69757L3.61427 11.9476C3.30916 12.2527 3.30916 12.7473 3.61427 13.0524L9.86427 19.3024C10.1694 19.6075 10.664 19.6075 10.9691 19.3024C11.2742 18.9973 11.2742 18.5027 10.9691 18.1976L6.05281 13.2812L20.8333 13.2812C21.2648 13.2812 21.6146 12.9315 21.6146 12.5C21.6146 12.0685 21.2648 11.7187 20.8333 11.7187L6.05281 11.7187L10.9691 6.80242C11.2742 6.49733 11.2742 6.00266 10.9691 5.69757Z" fill="#002B6A"/>
                </svg>
              </button>
              <div className="news-page-numbers-num">
               
                <span className="news-page-dots-span">...</span>
                {[18, 19, 20].map((num) => (
                  <span key={num} className="news-page-numbers-span">
                    {num}
                  </span>
                ))}
              </div>
              <button className="news-page-numbers-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.0309 19.3024C14.336 19.6075 14.8306 19.6075 15.1357 19.3024L21.3857 13.0524C21.6908 12.7473 21.6908 12.2527 21.3857 11.9476L15.1357 5.69761C14.8306 5.3925 14.336 5.3925 14.0309 5.69761C13.7258 6.00271 13.7258 6.49729 14.0309 6.8024L18.9472 11.7188H4.16667C3.7352 11.7188 3.38542 12.0685 3.38542 12.5C3.38542 12.9315 3.7352 13.2813 4.16667 13.2813H18.9472L14.0309 18.1976C13.7258 18.5027 13.7258 18.9973 14.0309 19.3024Z" fill="#002B6A"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="rubric">
            <div className="main-news-rubric">
              <div className="main-news-rubric-logo">
                <Image 
                  src="/mainpage/content/icon.png" 
                  alt="Rubric Icon"
                  width={50}
                  height={50}
                />
                <h1>Axborotlar xizmati</h1>
              </div>
              <ul>
                <li><Link href="#">Yangiliklar</Link></li>
                <li><Link href="#">Events</Link></li>
                <li><Link href="#">Lorem</Link></li>
                <li className="last"><Link href="#">ipsum</Link></li>
              </ul>
            </div>
            {/* Second rubric section - similar structure */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;