import type { Locale } from './config'

/**
 * Legal documents content (EN / ES / CA).
 *
 * Identity of the site owner (autónomo / freelance). These values are
 * interpolated into every document and language automatically.
 */
export const company = {
  legalName: 'Josep Vilchez Garcia',
  email: 'v13studio@v13studio.com',
  // Main data processor (used in privacy & cookies docs):
  hosting: 'Vercel Inc.',
} as const

/** Last substantive update of these documents. Update when you edit content. */
export const legalLastUpdated = '2026-06-10'

export type LegalSlug = 'legal-notice' | 'privacy' | 'cookies' | 'terms'

export interface LegalSection {
  heading: string
  /** Paragraphs. Use the `company` placeholders inline where needed. */
  body: string[]
}

export interface LegalDoc {
  slug: LegalSlug
  title: string
  /** Short description for <meta>. */
  description: string
  /** Intro paragraph rendered under the title. */
  intro: string
  sections: LegalSection[]
}

export const legalSlugs: LegalSlug[] = ['legal-notice', 'privacy', 'cookies', 'terms']

// ---------------------------------------------------------------------------
// ENGLISH
// ---------------------------------------------------------------------------

const en: Record<LegalSlug, LegalDoc> = {
  'legal-notice': {
    slug: 'legal-notice',
    title: 'Legal Notice',
    description: 'Legal notice and ownership information for V13 Studio.',
    intro:
      'This legal notice governs the use of this website, in compliance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE).',
    sections: [
      {
        heading: 'Site ownership',
        body: [
          `Owner: ${company.legalName} (self-employed professional / autónomo).`,
          `Contact email: ${company.email}.`,
        ],
      },
      {
        heading: 'Purpose',
        body: [
          'This website presents the services of V13 Studio, a digital product studio, and provides a contact channel for prospective clients.',
        ],
      },
      {
        heading: 'Terms of use',
        body: [
          'By accessing this website you agree to use it lawfully and in good faith. You shall not use the site to carry out activities that are unlawful or that infringe the rights of third parties.',
          'The owner may modify or remove any content at any time and without prior notice.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'All content on this website (texts, designs, logos, source code, images) is owned by V13 Studio or used under licence, and is protected by intellectual and industrial property law. Reproduction, distribution or public communication without authorisation is prohibited.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'The owner is not liable for any damages arising from the use of this website. Links to third-party sites are provided for convenience; the owner is not responsible for their content.',
        ],
      },
      {
        heading: 'Applicable law',
        body: [
          'This legal notice is governed by Spanish law. Any dispute shall be submitted to the courts of the owner’s domicile, unless mandatory consumer law provides otherwise.',
        ],
      },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'How V13 Studio collects and processes your personal data.',
    intro:
      'This privacy policy explains how we process your personal data in accordance with the EU General Data Protection Regulation (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).',
    sections: [
      {
        heading: 'Data controller',
        body: [
          `Controller: ${company.legalName} (self-employed professional / autónomo).`,
          `Email: ${company.email}.`,
        ],
      },
      {
        heading: 'What data we collect',
        body: [
          'Through the contact form we collect the name, email address and the content of the message you send us.',
          'Through analytics we may process technical data such as approximate location, device type and pages visited (see our Cookies Policy).',
        ],
      },
      {
        heading: 'Purpose and legal basis',
        body: [
          'Contact data is used solely to respond to your enquiry and manage the commercial relationship. Legal basis: your consent and/or pre-contractual measures taken at your request (Art. 6.1.a and 6.1.b GDPR).',
          'Analytics data is used to understand site usage and improve our services. Legal basis: our legitimate interest and/or your consent where required.',
        ],
      },
      {
        heading: 'Retention',
        body: [
          'We keep your contact data for as long as necessary to handle your request and, afterwards, for the legal periods required to address potential liabilities.',
        ],
      },
      {
        heading: 'Recipients',
        body: [
          `We do not sell your data. Data may be processed by our service providers acting as data processors, such as ${company.hosting} (hosting and analytics), under appropriate agreements. Some providers may process data outside the EU under adequate safeguards.`,
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `You may exercise your rights of access, rectification, erasure, restriction, portability and objection by emailing ${company.email}. You also have the right to lodge a complaint with the Spanish Data Protection Agency (AEPD, www.aepd.es).`,
        ],
      },
    ],
  },
  cookies: {
    slug: 'cookies',
    title: 'Cookies Policy',
    description: 'Information about cookies and tracking used on this website.',
    intro:
      'This policy explains the cookies and similar technologies used on this website, in compliance with Art. 22.2 LSSI-CE.',
    sections: [
      {
        heading: 'What are cookies',
        body: [
          'Cookies are small files that a website stores on your device to make it work or to collect usage information.',
        ],
      },
      {
        heading: 'Cookies we use',
        body: [
          'Technical / strictly necessary cookies: required for the site to function (e.g. theme and language preferences). These do not require consent.',
          `Analytics: we use ${company.hosting} Web Analytics and Speed Insights, which are designed to be privacy-friendly and do not use tracking cookies to build advertising profiles. Where any non-essential cookie or identifier is used, we will request your consent.`,
        ],
      },
      {
        heading: 'Managing cookies',
        body: [
          'You can block or delete cookies through your browser settings at any time. Disabling technical cookies may affect site functionality.',
        ],
      },
      {
        heading: 'Updates',
        body: [
          'We may update this policy if we add new tools. We recommend reviewing it periodically.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Use',
    description: 'Terms and conditions governing the use of this website.',
    intro:
      'These terms govern access to and use of this website. By browsing it you accept these terms in full.',
    sections: [
      {
        heading: 'Acceptance',
        body: [
          'Use of this website attributes the condition of user and implies full acceptance of these terms in the version published at the time of access.',
        ],
      },
      {
        heading: 'Use of the website',
        body: [
          'You agree to use the website and its content lawfully and not to engage in conduct that could damage the image, interests or rights of V13 Studio or third parties.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'All elements of the website are protected by intellectual and industrial property rights. No licence or right of use is granted beyond what is strictly necessary to view the site.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'V13 Studio does not guarantee the continuous availability of the website and is not liable for damages arising from its use or from temporary unavailability.',
        ],
      },
      {
        heading: 'Governing law',
        body: [
          'These terms are governed by Spanish law and the competent courts shall be those of the owner’s domicile, save where mandatory law provides otherwise.',
        ],
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// SPANISH
// ---------------------------------------------------------------------------

const es: Record<LegalSlug, LegalDoc> = {
  'legal-notice': {
    slug: 'legal-notice',
    title: 'Aviso Legal',
    description: 'Aviso legal e información de titularidad de V13 Studio.',
    intro:
      'El presente aviso legal regula el uso de este sitio web, en cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).',
    sections: [
      {
        heading: 'Titularidad del sitio',
        body: [
          `Titular: ${company.legalName} (profesional autónomo).`,
          `Correo de contacto: ${company.email}.`,
        ],
      },
      {
        heading: 'Objeto',
        body: [
          'Este sitio web presenta los servicios de V13 Studio, un estudio de producto digital, y ofrece un canal de contacto para clientes potenciales.',
        ],
      },
      {
        heading: 'Condiciones de uso',
        body: [
          'Al acceder a este sitio web te comprometes a utilizarlo de forma lícita y de buena fe. No podrás emplear el sitio para realizar actividades ilícitas o que infrinjan derechos de terceros.',
          'El titular podrá modificar o eliminar cualquier contenido en cualquier momento y sin previo aviso.',
        ],
      },
      {
        heading: 'Propiedad intelectual',
        body: [
          'Todos los contenidos de este sitio web (textos, diseños, logotipos, código fuente, imágenes) son titularidad de V13 Studio o se utilizan bajo licencia, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o comunicación pública sin autorización.',
        ],
      },
      {
        heading: 'Responsabilidad',
        body: [
          'El titular no se responsabiliza de los daños derivados del uso de este sitio web. Los enlaces a sitios de terceros se ofrecen a título informativo; el titular no responde de su contenido.',
        ],
      },
      {
        heading: 'Legislación aplicable',
        body: [
          'Este aviso legal se rige por la legislación española. Cualquier controversia se someterá a los juzgados del domicilio del titular, salvo que la normativa de consumo disponga otra cosa.',
        ],
      },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Política de Privacidad',
    description: 'Cómo V13 Studio recopila y trata tus datos personales.',
    intro:
      'Esta política de privacidad explica cómo tratamos tus datos personales conforme al Reglamento General de Protección de Datos (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        body: [
          `Responsable: ${company.legalName} (profesional autónomo).`,
          `Correo: ${company.email}.`,
        ],
      },
      {
        heading: 'Qué datos recopilamos',
        body: [
          'A través del formulario de contacto recopilamos tu nombre, dirección de correo electrónico y el contenido del mensaje que nos envías.',
          'A través de la analítica podemos tratar datos técnicos como la ubicación aproximada, el tipo de dispositivo y las páginas visitadas (consulta nuestra Política de Cookies).',
        ],
      },
      {
        heading: 'Finalidad y base legal',
        body: [
          'Los datos de contacto se utilizan únicamente para responder a tu consulta y gestionar la relación comercial. Base legal: tu consentimiento y/o la aplicación de medidas precontractuales a tu solicitud (art. 6.1.a y 6.1.b RGPD).',
          'Los datos de analítica se utilizan para entender el uso del sitio y mejorar nuestros servicios. Base legal: nuestro interés legítimo y/o tu consentimiento cuando proceda.',
        ],
      },
      {
        heading: 'Conservación',
        body: [
          'Conservamos tus datos de contacto durante el tiempo necesario para atender tu solicitud y, posteriormente, durante los plazos legales exigidos para atender posibles responsabilidades.',
        ],
      },
      {
        heading: 'Destinatarios',
        body: [
          `No vendemos tus datos. Pueden ser tratados por nuestros proveedores de servicios que actúan como encargados del tratamiento, como ${company.hosting} (alojamiento y analítica), bajo los acuerdos correspondientes. Algunos proveedores pueden tratar datos fuera de la UE con las garantías adecuadas.`,
        ],
      },
      {
        heading: 'Tus derechos',
        body: [
          `Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición escribiendo a ${company.email}. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD, www.aepd.es).`,
        ],
      },
    ],
  },
  cookies: {
    slug: 'cookies',
    title: 'Política de Cookies',
    description: 'Información sobre las cookies y el seguimiento de este sitio web.',
    intro:
      'Esta política explica las cookies y tecnologías similares que utiliza este sitio web, en cumplimiento del art. 22.2 de la LSSI-CE.',
    sections: [
      {
        heading: 'Qué son las cookies',
        body: [
          'Las cookies son pequeños archivos que un sitio web almacena en tu dispositivo para hacerlo funcionar o para recoger información de uso.',
        ],
      },
      {
        heading: 'Cookies que utilizamos',
        body: [
          'Cookies técnicas o estrictamente necesarias: imprescindibles para que el sitio funcione (por ejemplo, las preferencias de tema e idioma). No requieren consentimiento.',
          `Analítica: utilizamos ${company.hosting} Web Analytics y Speed Insights, diseñados para respetar la privacidad y que no emplean cookies de seguimiento para crear perfiles publicitarios. Si se utilizara alguna cookie o identificador no esencial, solicitaremos tu consentimiento.`,
        ],
      },
      {
        heading: 'Gestión de cookies',
        body: [
          'Puedes bloquear o eliminar las cookies en cualquier momento desde la configuración de tu navegador. Desactivar las cookies técnicas puede afectar al funcionamiento del sitio.',
        ],
      },
      {
        heading: 'Actualizaciones',
        body: [
          'Podemos actualizar esta política si incorporamos nuevas herramientas. Te recomendamos revisarla periódicamente.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Términos de Uso',
    description: 'Términos y condiciones que regulan el uso de este sitio web.',
    intro:
      'Estos términos regulan el acceso y uso de este sitio web. Al navegar por él aceptas estos términos en su totalidad.',
    sections: [
      {
        heading: 'Aceptación',
        body: [
          'El uso de este sitio web atribuye la condición de usuario e implica la aceptación plena de estos términos en la versión publicada en el momento del acceso.',
        ],
      },
      {
        heading: 'Uso del sitio web',
        body: [
          'Te comprometes a utilizar el sitio web y sus contenidos de forma lícita y a no realizar conductas que puedan dañar la imagen, los intereses o los derechos de V13 Studio o de terceros.',
        ],
      },
      {
        heading: 'Propiedad intelectual',
        body: [
          'Todos los elementos del sitio web están protegidos por derechos de propiedad intelectual e industrial. No se concede ninguna licencia o derecho de uso más allá de lo estrictamente necesario para visualizar el sitio.',
        ],
      },
      {
        heading: 'Responsabilidad',
        body: [
          'V13 Studio no garantiza la disponibilidad continuada del sitio web ni se responsabiliza de los daños derivados de su uso o de su indisponibilidad temporal.',
        ],
      },
      {
        heading: 'Legislación aplicable',
        body: [
          'Estos términos se rigen por la legislación española y los juzgados competentes serán los del domicilio del titular, salvo que la normativa imperativa disponga otra cosa.',
        ],
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// CATALAN
// ---------------------------------------------------------------------------

const ca: Record<LegalSlug, LegalDoc> = {
  'legal-notice': {
    slug: 'legal-notice',
    title: 'Avís Legal',
    description: 'Avís legal i informació de titularitat de V13 Studio.',
    intro:
      'Aquest avís legal regula l’ús d’aquest lloc web, en compliment de la Llei 34/2002 de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE).',
    sections: [
      {
        heading: 'Titularitat del lloc',
        body: [
          `Titular: ${company.legalName} (professional autònom).`,
          `Correu de contacte: ${company.email}.`,
        ],
      },
      {
        heading: 'Objecte',
        body: [
          'Aquest lloc web presenta els serveis de V13 Studio, un estudi de producte digital, i ofereix un canal de contacte per a clients potencials.',
        ],
      },
      {
        heading: 'Condicions d’ús',
        body: [
          'En accedir a aquest lloc web et compromets a utilitzar-lo de manera lícita i de bona fe. No podràs emprar el lloc per dur a terme activitats il·lícites o que infringeixin drets de tercers.',
          'El titular podrà modificar o eliminar qualsevol contingut en qualsevol moment i sense avís previ.',
        ],
      },
      {
        heading: 'Propietat intel·lectual',
        body: [
          'Tots els continguts d’aquest lloc web (textos, dissenys, logotips, codi font, imatges) són titularitat de V13 Studio o s’utilitzen sota llicència, i estan protegits per la normativa de propietat intel·lectual i industrial. Queda prohibida la seva reproducció, distribució o comunicació pública sense autorització.',
        ],
      },
      {
        heading: 'Responsabilitat',
        body: [
          'El titular no es responsabilitza dels danys derivats de l’ús d’aquest lloc web. Els enllaços a llocs de tercers s’ofereixen a títol informatiu; el titular no respon del seu contingut.',
        ],
      },
      {
        heading: 'Legislació aplicable',
        body: [
          'Aquest avís legal es regeix per la legislació espanyola. Qualsevol controvèrsia se sotmetrà als jutjats del domicili del titular, llevat que la normativa de consum disposi una altra cosa.',
        ],
      },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Política de Privacitat',
    description: 'Com V13 Studio recull i tracta les teves dades personals.',
    intro:
      'Aquesta política de privacitat explica com tractem les teves dades personals d’acord amb el Reglament General de Protecció de Dades (RGPD) i la Llei Orgànica 3/2018 (LOPDGDD).',
    sections: [
      {
        heading: 'Responsable del tractament',
        body: [
          `Responsable: ${company.legalName} (professional autònom).`,
          `Correu: ${company.email}.`,
        ],
      },
      {
        heading: 'Quines dades recollim',
        body: [
          'A través del formulari de contacte recollim el teu nom, adreça de correu electrònic i el contingut del missatge que ens envies.',
          'A través de l’analítica podem tractar dades tècniques com la ubicació aproximada, el tipus de dispositiu i les pàgines visitades (consulta la nostra Política de Cookies).',
        ],
      },
      {
        heading: 'Finalitat i base legal',
        body: [
          'Les dades de contacte s’utilitzen únicament per respondre la teva consulta i gestionar la relació comercial. Base legal: el teu consentiment i/o l’aplicació de mesures precontractuals a la teva sol·licitud (art. 6.1.a i 6.1.b RGPD).',
          'Les dades d’analítica s’utilitzen per entendre l’ús del lloc i millorar els nostres serveis. Base legal: el nostre interès legítim i/o el teu consentiment quan escaigui.',
        ],
      },
      {
        heading: 'Conservació',
        body: [
          'Conservem les teves dades de contacte durant el temps necessari per atendre la teva sol·licitud i, posteriorment, durant els terminis legals exigits per atendre possibles responsabilitats.',
        ],
      },
      {
        heading: 'Destinataris',
        body: [
          `No venem les teves dades. Poden ser tractades pels nostres proveïdors de serveis que actuen com a encarregats del tractament, com ${company.hosting} (allotjament i analítica), sota els acords corresponents. Alguns proveïdors poden tractar dades fora de la UE amb les garanties adequades.`,
        ],
      },
      {
        heading: 'Els teus drets',
        body: [
          `Pots exercir els teus drets d’accés, rectificació, supressió, limitació, portabilitat i oposició escrivint a ${company.email}. També tens dret a presentar una reclamació davant l’Agència Espanyola de Protecció de Dades (AEPD, www.aepd.es).`,
        ],
      },
    ],
  },
  cookies: {
    slug: 'cookies',
    title: 'Política de Cookies',
    description: 'Informació sobre les cookies i el seguiment d’aquest lloc web.',
    intro:
      'Aquesta política explica les cookies i tecnologies similars que utilitza aquest lloc web, en compliment de l’art. 22.2 de la LSSI-CE.',
    sections: [
      {
        heading: 'Què són les cookies',
        body: [
          'Les cookies són petits arxius que un lloc web emmagatzema al teu dispositiu per fer-lo funcionar o per recollir informació d’ús.',
        ],
      },
      {
        heading: 'Cookies que utilitzem',
        body: [
          'Cookies tècniques o estrictament necessàries: imprescindibles perquè el lloc funcioni (per exemple, les preferències de tema i idioma). No requereixen consentiment.',
          `Analítica: utilitzem ${company.hosting} Web Analytics i Speed Insights, dissenyats per respectar la privacitat i que no empren cookies de seguiment per crear perfils publicitaris. Si s’utilitzés alguna cookie o identificador no essencial, sol·licitarem el teu consentiment.`,
        ],
      },
      {
        heading: 'Gestió de cookies',
        body: [
          'Pots bloquejar o eliminar les cookies en qualsevol moment des de la configuració del teu navegador. Desactivar les cookies tècniques pot afectar el funcionament del lloc.',
        ],
      },
      {
        heading: 'Actualitzacions',
        body: [
          'Podem actualitzar aquesta política si incorporem noves eines. Et recomanem revisar-la periòdicament.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Termes d’Ús',
    description: 'Termes i condicions que regulen l’ús d’aquest lloc web.',
    intro:
      'Aquests termes regulen l’accés i ús d’aquest lloc web. En navegar-hi acceptes aquests termes en la seva totalitat.',
    sections: [
      {
        heading: 'Acceptació',
        body: [
          'L’ús d’aquest lloc web atribueix la condició d’usuari i implica l’acceptació plena d’aquests termes en la versió publicada en el moment de l’accés.',
        ],
      },
      {
        heading: 'Ús del lloc web',
        body: [
          'Et compromets a utilitzar el lloc web i els seus continguts de manera lícita i a no realitzar conductes que puguin danyar la imatge, els interessos o els drets de V13 Studio o de tercers.',
        ],
      },
      {
        heading: 'Propietat intel·lectual',
        body: [
          'Tots els elements del lloc web estan protegits per drets de propietat intel·lectual i industrial. No es concedeix cap llicència o dret d’ús més enllà del que és estrictament necessari per visualitzar el lloc.',
        ],
      },
      {
        heading: 'Responsabilitat',
        body: [
          'V13 Studio no garanteix la disponibilitat continuada del lloc web ni es responsabilitza dels danys derivats del seu ús o de la seva indisponibilitat temporal.',
        ],
      },
      {
        heading: 'Legislació aplicable',
        body: [
          'Aquests termes es regeixen per la legislació espanyola i els jutjats competents seran els del domicili del titular, llevat que la normativa imperativa disposi una altra cosa.',
        ],
      },
    ],
  },
}

const legalByLocale: Record<Locale, Record<LegalSlug, LegalDoc>> = { en, es, ca }

export function isLegalSlug(value: string): value is LegalSlug {
  return (legalSlugs as string[]).includes(value)
}

export function getLegalDoc(locale: Locale, slug: LegalSlug): LegalDoc {
  return (legalByLocale[locale] ?? legalByLocale.en)[slug]
}

/** All docs for a locale, in display order. */
export function getLegalDocs(locale: Locale): LegalDoc[] {
  const docs = legalByLocale[locale] ?? legalByLocale.en
  return legalSlugs.map((s) => docs[s])
}
