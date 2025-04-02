"use client";

import { useState } from 'react';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import './page.css'
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format&q=80" 
          alt="Profile" 
          className="profile-image" 
        />
        <div className="profile-content">
          <h1 className="profile-name">Djumanazarova Zulfiya Kojabaevna</h1>
          <h2 className="profile-title">Ximiya ilimleri boyınsha filosofiya doktori, PhD dotsent</h2>
          
          <div onClick={() => setIsOpen(!isOpen)} className="description-header">
            <ChevronDown className={`arrow ${isOpen ? 'open' : ''}`} size={20} />
            <h3>Краткое описание</h3>
          </div>
          
          <div className={`description-content ${isOpen ? 'open' : ''}`}>
            <p className="description-text">
              </p>
            <p className="description-text">
              2018 jili «Magniy hám kaltsiy nitratlarıniń bir túrli hám aralas ligandlı koordinatsion birikpeleriniń sintezi, dúzilisi hám qásiyetleri» temasında 02.00.01–Organikalıq yemes ximiya qánigeligi boyınsha Özbekstan milliy universiteti janındag'ı qánigeleştirilgen Keńesinde kandidatlık dissertatsiyasın jaqladı.
            </p>
            <p className="description-text">
              40 tan aslam ilimiy miynetleri, soniń ishinde 6 oqıw-metodikalıq qollanbası baspadan shıqqan. 2020 jıldan Qaraqalpaq mámleketlik universiteti «Organikalıq hám organikalıq yemes ximiya» kafedrası baslıg'ı lawazımında islep kelmekte.
            </p>
            <p className="description-text">
              Ilimiy bag'darı: Kompleks birikpeleri ximiyası. Organikalıq yemes ximiya.
            </p>
          </div>

          <div className="contact-info">
            <a href="mailto:zulya19_86@mail.ru" className="contact-item">
              <Mail size={18} />
              zulya19_86@mail.ru
            </a>
            <a href="tel:+998901234567" className="contact-item">
              <Phone size={18} />
              +998 90 123 45 67
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}