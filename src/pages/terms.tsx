/* eslint-disable */
import Head from "next/head";
import Image from "next/image";
import BaseContainer from "@/components/BaseContainer";
import Header from "@/components/Header";
import FooterAdmin from "@/components/admin/FooterAdmin";
import TopDownButton from "@/components/TopDownButton";

const Terms = () => {
  return (
    <>
      <Head>
        <title>Terms of Use | PAXIV</title>
        <meta name="description" content="Paxiv" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>
      <main className="w-full relative m-auto overflow-hidden min-h-screen bg-white">
        <div className="absolute left-0 top-0 w-full">
          <Image
            width={1920}
            height={500}
            src="/images/back.png"
            className="w-full h-[500px] kl:h-[1000px] object-cover"
            alt="privacy"
          />
        </div>
        <Header />
        <BaseContainer>
          <div className="flex flex-col text-[#212121]">
            <h1 className="text-4xl sm:text-[50px] kl:text-[100px] text-white font-semibold tracking-[15px] uppercase text-center mt-28 kl:mt-[350px]">
              Terms of Use
            </h1>
            <div className="bg-white px-4 sm:px-12 kl:px-24 py-10 kl:py-20 rounded-[28px] mt-[250px] kl:mt-[500px]">
              <div className="flex flex-col">
                <p className="text-xl sm:text-2xl kl:text-5xl font-semibold leading-9 mt-8 kl:mt-16">
                  YOUR USE OF THIS WEB SITE CONSTITUTES YOUR AGREEMENT TO BE
                  BOUND BY THESE TERMS AND CONDITIONS OF USE.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Acceptance of Terms of Use
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  This site (the &quot;Site&quot;) is operated by PAXIV, LLC and
                  its affiliates (collectively, &quot;PAXIV&quot; or
                  &quot;we&quot; or &quot;us&quot;). By accessing or using this
                  Site (or any part thereof), you agree to be legally bound by
                  the terms and conditions that follow (the &quot;Terms of
                  Use&quot;) as we may modify them from time to time. These
                  Terms of Use apply to your use of this Site, including the
                  PAXIV services offered via the Site. They constitute a legal
                  contract between you and PAXIV, and by accessing or using any
                  part of the Site you represent and warrant that you have the
                  right, power and authority to agree to and be bound by these
                  Terms of Use. If you do not agree to the Terms of Use, or if
                  you do not have the right, power, and authority to agree to
                  and be bound by these Terms of Use, you may not use the Site.
                  Notwithstanding anything to the contrary herein, if you and
                  PAXIV have entered into a separate written agreement that
                  covers your use of a PAXIV service, the terms and conditions
                  of such agreement shall control with respect to such service
                  to the extent they are inconsistent with these Terms of Use.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Purpose of Site
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  The Site is intended to provide information about commercial
                  real estate and PAXIV. The information and services offered on
                  or through this Site are provided solely for general business
                  information, do not constitute real estate, legal, tax,
                  accounting, investment or other professional advice, or an
                  offer to sell or lease real estate, and may not be used for or
                  relied upon for these purposes. No lawyer-client, advisory,
                  fiduciary or other relationship is created by your accessing
                  or using this Site or communicating by way of email through
                  this Site. You shall not use information and services offered
                  on or through this Site for personal, family or household
                  purposes or to determine an individual's eligibility for
                  credit, insurance, employment, or government license or
                  benefit. You shall also not use the Site in any way that is
                  intended to cause the Information (as defined below) to
                  constitute a “consumer report” under the Fair Credit Reporting
                  Act, 15 U.S.C. § 1681 et seq. or in any other manner that is
                  intended to be construed as a consumer report by any
                  governmental authority.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Services
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  The information, data, text, software, photographs, images,
                  forms, agreements, graphics, organization, layout, design, and
                  other content contained on or provided through this Site
                  (collectively, the "Content") are proprietary to PAXIV and its
                  licensors, and are protected by copyright and other U.S.,
                  Canadian and international intellectual property rights, laws
                  and treaties. The Content includes proprietary databases (the
                  "Database") of commercial real estate information, which, by
                  way of example, include tools provided by PAXIV, information,
                  text, forms, agreements, photographic and other images and
                  data contained therein (collectively, the "Information") and
                  the proprietary organization and structures for categorizing,
                  sorting and displaying such Information, and the related
                  software ("Software"). The Site, Content, Database,
                  Information, Software and any portion of the foregoing,
                  including any derivatives, adaptations, successors, updates or
                  modifications provided thereto and any information derived
                  from the use of the Database, including as a result of the
                  verification of any portion of the Information, are
                  collectively referred to herein as the "Product". Those
                  portions of the Product that may be accessed by the general
                  public and that do not require any use of Passcodes (as
                  defined below) or two factor authentication are referred to as
                  the "Non-Passcode Protected Product". Those portions of the
                  Product that require use of Passcodes and, if applicable,
                  two-factor authentication, including, but not limited to,
                  facial recognition authentication and are available only to
                  individuals or entities ("PAXIV Clients"), or those acting
                  through them, who enter into a License Agreement (as defined
                  below) with PAXIV that authorizes access to such PAXIV service
                  are referred to as the "Passcode Protected Product". PAXIV
                  utilizes registered and unregistered trademarks protected by
                  United States, Canadian and other laws. A "License Agreement"
                  is defined as either (i) a written and signed contract between
                  a PAXIV Client and PAXIV that authorizes access to a PAXIV
                  service, or (ii) an online contract between the PAXIV Client
                  and PAXIV that is formed by online registration and acceptance
                  of these Terms of Use or other online contract established by
                  PAXIV and that authorizes access to a PAXIV service. Only
                  Authorized Users (defined below) for a Passcode Protected
                  Product may access such product and they may access it solely
                  using the user name, password (collectively, the “Passcodes”)
                  and, if required by PAXIV, Passcodes with two-factor
                  authentication, including, but not limited to, facial
                  recognition authentication. PAXIV may use the Passcode and, if
                  required by PAXIV, two-factor authentication as the means to
                  authenticate your identity when you access and use the
                  Passcode Protected Product. As part of the facial recognition
                  authentication, you must register your internet-capable,
                  camera-ready mobile device with PAXIV, which requires you to
                  permit PAXIV to take an initial photograph of your face
                  through your device’s camera. Thereafter, each time you access
                  the Passcode Protected Product, you agree to permit PAXIV to
                  take a photograph of your face through your device’s camera
                  for PAXIV to authenticate. PAXIV may store any photographs or
                  other files you submit in its systems indefinitely and use
                  them for the purpose of Passcode Protected Product
                  authentication. PAXIV is under no obligation to confirm the
                  actual identity or authority of any party accessing the
                  Passcode Protected Product under your Passcode or other
                  authentication method. An Authorized User will maintain the
                  confidentiality of his/her Passcode and may not share his/her
                  Passcodes with any other person, nor may an Authorized User
                  allow any other person to use or have access to his/her
                  Passcodes. You agree to notify PAXIV Account Security, via
                  email at accountsecurity@PAXIV.com immediately of any
                  unauthorized use of any Passcode or other breach of security.
                  Unauthorized attempts to (i) defeat or circumvent Passcodes or
                  other security features (e.g., facial recognition
                  authentication), (ii) use the Site or the Product for other
                  than intended purposes, or (iii) obtain, alter, damage or
                  destroy information or otherwise to interfere with the system
                  of its operation are not permitted and may result in a loss of
                  access to the Passcode Protected Product. Evidence of such
                  acts may also be disclosed to law enforcement authorities and
                  result in criminal prosecution under the laws of the United
                  States, Canada or such other jurisdictions as may apply. An
                  “Authorized User” is defined as an individual specifically
                  designated by PAXIV Client and given access by PAXIV Client
                  through its account (a) employed by a PAXIV Client or an
                  Exclusive Contractor (as defined below) of a PAXIV Client at a
                  site identified in the License Agreement accessing through the
                  PAXIV Client, and (b) who is specified in the License
                  Agreement as a user of a specific Passcode Protected Product
                  and represented by the Client to be an employee or Exclusive
                  Contractor of the Client. An "Exclusive Contractor" is defined
                  as an individual person working solely for the PAXIV Client
                  and not another company with real estate information needs or
                  for themselves and performing substantially the same services
                  for such PAXIV Client as an employee of such PAXIV Client.
                  PAXIV’s issuance of a Passcode shall not be construed as a
                  confirmation or admission by PAXIV that the person receiving
                  the Passcode qualifies as an Authorized User.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  PAXIV SPOTLIGHTS
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  PAXIV may provide SPOTLIGHTS subscriptions as part of its
                  offering to its users (“PAXIV SPOTLIGHTS”). PAXIV SPOTLIGHTS
                  is provided through the Site and email. As a subscriber to
                  PAXIV, PAXIV grants you a limited revocable license to use
                  PAXIV SPOTLIGHTS for non-commercial use subject to rules and
                  limitations herein. You shall be subject to the following
                  rules regarding acceptable conduct and practices: You (1) may
                  not modify, publish, transmit, display, participate in the
                  transfer or sale, create derivative works, or in any way
                  exploit the content of the PAXIV SPOTLIGHTS sites or any
                  portion of such content, (2) may not use any data mining,
                  robots, or similar data gathering and extraction tools on the
                  content, frame any portion of the PAXIV SPOTLIGHTS sites or
                  content, or reproduce, reprint, copy, store, publicly display,
                  broadcast, transmit, modify, translate, port, publish,
                  sublicense, assign, transfer, sell, loan, or otherwise
                  distribute the content without PAXIV’s prior written consent,
                  (3) may not circumvent any mechanisms included in the content
                  for preventing the unauthorized reproduction or distribution
                  of the content, (4) may not upload, post or otherwise
                  distribute or facilitate the distribution of a software virus
                  or any other computer code that is designed or intended to
                  disrupt, damage, or limit the functioning of the Site, any
                  other online services, or to obtain unauthorized access to the
                  online services or content or any data or other information of
                  any third party, (5) may not attempt to gain unauthorized
                  access to other computer systems or networks connected to the
                  online services or use the online services, content or any
                  information contained therein for any unlawful purpose; PAXIV,
                  in its sole and absolute discretion, shall determine whether
                  any content you transmit or receive or your use of PAXIV
                  SPOTLIGHTS violates this provision, and (6) may not use the
                  online services, content or any information contained therein
                  for any unlawful purpose, and you may not encourage conduct
                  that would constitute a criminal offense or give rise to civil
                  liability. You may not use any services in connection with any
                  site or other use that contains or is associated with
                  information or content prohibited by this section. As between
                  PAXIV and you, the content and materials incorporated by PAXIV
                  on the Site are protected by copyrights, patents, trade
                  secrets or other proprietary rights. Some of the characters,
                  logos or other images incorporated by PAXIV on this Site are
                  also protected as registered or unregistered trademarks, trade
                  names and/or service marks owned by PAXIV or others.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Free Trial
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  From time to time, in PAXIV's sole discretion, PAXIV may offer
                  a free trial period ("Free Trial") to certain individuals
                  ("Free Trial Participant") chosen by PAXIV to participate in
                  the free trial. PAXIV will specifically notify the Free Trial
                  Participants of their eligibility to participate in the Free
                  Trial. Unless terminated sooner by PAXIV, the Free Trial shall
                  last for the length of time specified in the email from PAXIV
                  that distributes Passcodes to the Free Trial Participant or in
                  any other notification to the Free Trial Participant by PAXIV.
                  The terms set forth in that email or notification, combined
                  with these Terms of Use, shall constitute a License Agreement
                  between PAXIV and the Free Trial Participant relating to such
                  individual's access to and use of the associated Passcode
                  Protected Product being offered through the Free Trial. During
                  the Free Trial the Free Trial Participant shall be considered
                  an Authorized User and a PAXIV Client (as defined in these
                  Terms of Use) and may use the Passcode Protected Product
                  during the Free Trial subject to and solely in accordance with
                  the terms outlined in such License Agreement relating to the
                  Free Trial (which includes these Terms of Use).
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Permitted Uses
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  Subject to the provisions in these Terms of Use, you may use
                  the Non-Passcode Protected Product (or, if you are an
                  Authorized User, subject to the provisions in your License
                  Agreement and these Terms of Use, you may use the applicable
                  Passcode Protected Product), in the ordinary course of your
                  business for:
                  <p className="px-8 py-4">
                    (1) Your internal research purposes;
                    <br />
                    (2) Providing information regarding a limited number of
                    particular properties and market trends internally;
                    <br />
                    (3) Marketing properties;
                    <br />
                    (4) Supporting your valuation, appraisal or counseling
                    regarding a specific property; and
                    <br />
                    (5) Creating periodic general market research reports for
                    in-house use, provided that such reports do not
                    containbuilding-specific or tenant-specific Information and
                    are not commercially or generally distributed.
                  </p>
                  Subject to the provisions in your License Agreement and these
                  Terms of Use, you may not print Information or copy
                  Information into word processing, spreadsheet and presentation
                  programs (or other software programs without the express
                  written consent of PAXIV).
                  <br />
                  <br />
                  Notwithstanding the foregoing, the Information you access
                  through any free or temporary access service on this Site may
                  only be viewed by you for your individual, non-commercial use
                  while visiting this Site.
                </div>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Prohibited Uses
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  You shall not, except (i) as may be expressly set forth above
                  under "Permitted Uses" and (ii) to the extent necessary to
                  integrate commercial property listings within PAXIV's website,
                  (a) distribute, disclose, copy, reproduce, communicate to the
                  public by telecommunication, make available, display, publish,
                  transmit, assign, sublicense, transfer, provide access to,
                  use, rent or sell, directly orindirectly (including in
                  electronic form) any portion of the Product, or (b) modify,
                  adapt or create derivative works of any portion of the
                  Product.
                  <br />
                  <br />
                  Notwithstanding anything to the contrary herein, you shall
                  not:
                  <br />
                  <br />
                  (1) Access any portion of a Passcode Protected Product unless
                  you are an Authorized User for such Passcode Protected Product
                  using the Passcodes assigned to you by PAXIV to access the
                  components and services of the Passcode Protected Product that
                  your License Agreement authorizes you to access, subject to
                  the terms contained therein and in these Terms of Use;
                  <br />
                  <br />
                  (2) Access or use any portion of the Product if you are a
                  direct or indirect competitor of PAXIV, nor shall you provide,
                  disclose or transmit any portion of the Product to any direct
                  or indirect competitor of PAXIV (by way of example, a "direct
                  or indirect competitor" of PAXIV includes, but is not limited
                  to, Internet listing services or other real estate information
                  services and employees, independent contractors and agents of
                  such services);
                  <br />
                  <br />
                  (3) Provide your Passcode or otherwise provide access to a
                  Passcode Protected Product to any individual other than
                  yourself, including by providing the results of queries of or
                  reports generated from a Passcode Protected Product to a
                  person who is not a client or prospective client.
                  <br />
                  <br />
                  (4) Use or distribute any Information from the Product,
                  including Information that has been verified or confirmed by
                  you or anyone else, to directly or indirectly create or
                  contribute to the development of any database or product;
                  <br />
                  <br />
                  (5) Modify, merge, decompile, disassemble, scrape, translate,
                  decode or reverse engineer any portion of the Product, or use
                  any data mining, gathering or extraction tool, or any robot,
                  spider or other automatic device or manual process, to monitor
                  or copy any portion of the Product or the data generated from
                  it;
                  <br />
                  <br />
                  (6) Use, reproduce, publish or compile any portion of the
                  Product for the purpose of selling or licensing any portion of
                  the Product or making any portion of the Product publicly
                  available;
                  <br />
                  <br />
                  (7) Store, copy or export any portion of the Product into any
                  database or other software, except as expressly set forth in
                  the Permitted Uses above;
                  <br />
                  <br />
                  (8) Upload, post or otherwise publish any portion of the
                  Product on, or provide access to any portion of the Product
                  through, the Internet, any bulletin board system, any other
                  electronic network, any data library, any listing service or
                  any other data sharing arrangement, except that you may e-mail
                  a report containing Information that complies with the
                  Permitted Use provisions set forth above to a limited number
                  of your clients and prospective clients;
                  <br />
                  <br />
                  (9) Upload, post, e-mail, make available or otherwise transmit
                  or communicate to the public by telecommunication any
                  information, data, text, software, photographs, images,
                  graphics, or other content to or through the Product, or use
                  any portion of this Product in a manner, that:
                  <br />
                  <br />
                  <p className="px-6">
                    (a) is unlawful, threatening, abusive, harmful, libelous,
                    tortious, defamatory, false, misleading, obscene, vulgar,
                    racially or ethnically offensive, invasive of privacy
                    orpublicity rights, inclusive of hate speech, or would
                    constitute or encourage a criminal offence, violate the
                    rights of any party, give rise to liability or violate any
                    local, provincial, federal or international law,
                    intentionally or unintentionally, or is otherwise
                    objectionable;
                  </p>
                  <p className="px-6">
                    (b) infringes any patent, copyright, trademark, trade
                    secret, or other proprietary right of any party or violates
                    the privacy or publicity rights of any party;{" "}
                  </p>
                  <p className="px-6">
                    (c) constitutes unlawful advertising or fraudulent, unfair
                    or deceptive practices, "spam," or any other form of
                    unlawful solicitation in the United States, Canada or other
                    county, including the Kansas non-solicitation law (K.S.A.
                    45-230), which, with limited exceptions, prohibits anyone
                    from knowingly selling, giving or receiving, for the purpose
                    of selling or offering for sale any property or service to
                    persons listed therein, any list of names and addresses
                    contained in or derived from Kansas public records; or
                  </p>
                  <p className="px-6">
                    (d) contains software viruses or any other computer code,
                    files or programs that are designed to or have the
                    capability to interrupt, modify, damage, improperly
                    access,disable, destroy or limit the functionality of the
                    Product or servers or networks connected thereto or the
                    activities of other users of the Product or of any computer
                    software or hardware or telecommunications equipment.
                  </p>
                  <br />
                  <br />
                  (10) Except as set forth in a License Agreement, you
                  acknowledge and agree that you do not have a right to make
                  available, communicate to the public by telecommunication,
                  transmit under any law, contractual obligation (i.e.,
                  nondisclosure agreement) or fiduciary duty any information
                  about the Product.
                  <br />
                  <br />
                  (11) Impersonate any person or entity, including but limited
                  to an Authorized User, or falsely state or otherwise
                  misrepresent any registration information, or otherwise
                  disguise the origin of any information, data, text, software,
                  photographs, images, graphics, or other content posted on or
                  transmitted through the Product; and
                  <br />
                  <br />
                  (12) Use any portion of the Product to encourage or engage in
                  illegal activity, stalk or harass another person, or violate
                  these Terms of Use or any applicable local, state, provincial,
                  national or international law, rule, regulation orordinance,
                  including without limitation, state, provincial and local real
                  estate practice, spam or privacy laws.
                  <br />
                  <br />
                  (13) Market properties or otherwise communicate with contacts
                  acquired from the Licensed Product without first obtaining the
                  appropriate consents and permissions as required by applicable
                  law.
                </div>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Fees
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  You are responsible for the timely payment of any fees
                  incurred by your use of components and services available on
                  the Site or via links to other websites, and all taxes
                  applicable to your use of the Product.
                  <br />
                  <br />
                  SUBJECT TO THE TERMS OF ANY LICENSE AGREEMENT BETWEEN PAXIV
                  AND YOUR COMPANY, WE RESERVE THE RIGHT, AT ANY TIME AND FROM
                  TIME TO TIME, TO PROSPECTIVELY CHANGE THE NATURE AND AMOUNT OF
                  FEES CHARGED FOR ACCESS TO THE PRODUCT OR ANY OF THE
                  COMPONENTS OR SERVICES AVAILABLE ON THEPRODUCT, AND THE MANNER
                  IN WHICH SUCH FEES ARE ASSESSED.
                  <br />
                  <br />
                  If you are accessing the Passcode Protected Product, you
                  agree:
                  <br />
                  <br />
                  <span className="px-4">
                    (1) to provide PAXIV with accurate and complete registration
                    and billing information and to promptly update such
                    information in the event it changes; and
                  </span>
                  <br />
                  <span className="px-4">
                    (2) to pay any applicable license fees or other fees
                    incurred by your use of the Passcode Protected Product.
                  </span>
                  <br />
                  <br />
                  With respect to the online registration for subscribing PAXIV,
                  you agree to a recurring monthly charge on your credit card
                  until canceled by you upon 30 days written notice to PAXIV.
                  <br />
                  <br />
                  Should you terminate or fail to make timely payment and,
                  within 24 months of your last payment to PAXIV, you enter into
                  any transaction with an opportunity made available to you
                  through your relationship with PAXIV (a “PAXIV Procured
                  Transaction”), you agree to be liable to PAXIV for the greater
                  of $20,000 per month or 2 times your monthly subscription from
                  the last payment to Paxiv until you consummate the last PAXIV
                  Procured Transaction and you authorize PAXIV to lien any
                  related transaction and to charge any payment method
                  previously approved by you.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Termination and Interruption of Access
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  You acknowledge and agree that PAXIV may interrupt, terminate,
                  discontinue, or block your access to the Product or portions
                  thereof at any time, subject to the terms of any License
                  Agreement in place between you or your company and PAXIV.
                  PAXIV reserves the right to terminate or suspend your use of a
                  PAXIV service or toterminate your License Agreement upon a
                  good faith determination of a violation of the terms of any
                  material provision of any other agreement between the parties
                  or their affiliates. In the event such suspension or
                  termination occurs, you shall cease using any portion of the
                  Product, permanently delete or destroy all portions of the
                  Product within your possession, custody or control, and, upon
                  written request from PAXIV, certify, in writing, your
                  compliance with this provision.
                  <br />
                  <br />
                  If you are a PAXIV Client, your License Agreement sets forth
                  an initial term that expires on a specified date and that may
                  automatically renew for a specified length. Following the
                  effective date of termination or non-renewal of your License
                  Agreement, you shall cease using any portion of the Product.
                  Should you terminate or fail to make timely payment and,
                  within 24 months of your last payment to PAXIV, you enter into
                  any transaction with an opportunity made available to you
                  through your relationship with PAXIV (a “PAXIV Procured
                  Transaction”), you agree to be liable to PAXIV for the greater
                  of $20,000 per month or 2 times your monthly subscription from
                  the last payment to Paxiv until you consummate the last PAXIV
                  Procured Transaction and you authorize PAXIV to lien any
                  related transaction and to charge any payment method
                  previously approved by you.
                  <br />
                  <br />
                  In addition, you shall permanently delete or destroy all
                  portions of the Product within your possession, custody or
                  control and, upon written request from PAXIV, certify, in
                  writing, your compliance with this provision.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Confidentiality Within Web Version of PAXIV
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  The documents stored in the "saved searches" section of the
                  PAXIV are intended to be confidential. Authorized access is
                  designed to be restricted to the Authorized User(s) that store
                  the information there and other users designated by such
                  Authorized User(s) to have access to the information.
                  <br />
                  <br />
                  Consistent with this goal of confidentiality, in addition to
                  any other right provided for herein, PAXIV reserves the right
                  to compile statistical information regarding use of various
                  features of this Site and PAXIV's services, including the
                  saved searches section. PAXIV also reserves the right for
                  PAXIV and its contractors to access any portion of its
                  services to perform customer support, product or system
                  development, routine security inspections, to protect against
                  unauthorized use of our products or services, to respond to
                  legal process, or if otherwise required to do so by law.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Submitted Content
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  This Product may include opportunities for users to submit
                  information, data, text, photographs, images, graphics,
                  messages, links, expressions of ideas and other content to the
                  Product, for it to be publicly displayed on the Product, used
                  by PAXIV in connection with researching real estate activity,
                  or for some other purpose ("Submitted Content"). PAXIV
                  acknowledges that if you provide PAXIV with any information or
                  images, then you retain any applicable ownership rights that
                  you may have with respect to such information and images.
                  However, you understand that all such Submitted Content,
                  whether publicly posted or privately transmitted, is the sole
                  responsibility of the person from which such content
                  originated. This means that you, and not PAXIV, are entirely
                  responsible for all such content that you upload, post, e-mail
                  or otherwise transmit to or via the Product. PAXIV is under no
                  obligation to post or use any such Submitted Content you may
                  provide and may remove any such content at any time in PAXIV's
                  sole discretion.
                  <br />
                  <br />
                  You agree that PAXIV may adjust portions of the Information
                  contained within the Product. Any such adjustment will have no
                  material impact on the meaning and interpretation of the
                  Information, but will serve as a means of uniquely identifying
                  the Information as having been supplied to you. You accept
                  that this is a legitimate and lawful security precaution on
                  the part of PAXIV, and accept further that in the event that
                  any third party has access to Information that can be
                  identified as having your unique adjustments a prima facie
                  breach of security and of these Terms of Use on your part may
                  be assumed by PAXIV.
                  <br />
                  <br />
                  With respect to all Submitted Content you elect to upload,
                  post, e-mail or otherwise transmit to or via the Product, you
                  grant PAXIV and its licensees a royalty-free, perpetual,
                  irrevocable, non-exclusive and fully sub-licensable right and
                  license (through multiple tiers) to use, reproduce,
                  communicate to the public by telecommunications, make
                  available, adapt, perform, display, publish, translate,
                  prepare derivative works from,modify, distribute, sell, rent
                  and take any other action with respect to such content (in
                  whole or part) worldwide and/or to incorporate it in other
                  works in any form, media, or technology now known or later
                  developed. You further acknowledge and agree that PAXIV may
                  preserve any such content and may also disclose such content
                  in its discretion. The foregoing license is without
                  restrictions of any kind and without payment due from PAXIV.
                  <br />
                  <br />
                  You also hereby forever waive and agree never to assert any
                  and all Moral Rights you may have in or with respect to any
                  Submitted Content. “Moral Rights” means any so-called “moral
                  rights” or “droit moraux” or any similar right which you may
                  have in any Submitted Content, existing under judicial or
                  statutory law of any country in the world, or under any
                  treaty. For greater certainty, these so-called “moral rights”
                  or “droits moraux” shall not include the so-called “paternal
                  right”.
                  <br />
                  <br />
                  You represent and warrant that
                  <p className="px-8 py-4">
                    <span>
                      (a) you own or have the full right, power and authority to
                      grant to PAXIV use of and rights in and to all Submitted
                      Content that you upload,post, e-mail or otherwise transmit
                      to or via the Product;
                    </span>
                    <br />
                    <span>
                      (b) your license of such content to PAXIV hereunder does
                      not, and the use or license of such content by PAXIV to
                      third parties will not, infringe any right or interest
                      owned or possessed by any third party;
                    </span>
                    <br />
                    <span>
                      (c) there are no claims, judgments or settlements to be
                      paid by you, or pending claims or litigation, relating to
                      such content; and
                    </span>
                    <br />
                    <span>
                      (d) all content submitted by you is complete and accurate
                      and will be updated by you within 30 days of any change.
                    </span>
                  </p>
                  You acknowledge and agree that your submitting Submitted
                  Content to the Site does not create any new or alter any
                  existing relationships between you and PAXIV.
                  <br />
                  <br />
                  PAXIV has no obligation to monitor or screen Submitted Content
                  and is not responsible for Submitted Content. However, PAXIV
                  reserves the right, in its sole discretion, to monitor
                  Submitted Content, edit Submitted Content or delete Submitted
                  Content at any time for any reason or no reason.
                </div>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  PAXIV Data Analysis
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  You own the data you submit to PAXIV. What’s yours stays
                  yours, and you can do anything you want with your data. If you
                  are a commercial real estate owner, investor, or property
                  manager, as long as you are a client, PAXIV will always
                  provide you access to your information at your request. And if
                  you are a firm that owns, invests in, brokers, or manages
                  commercial real estate, as long as you are a client, we will
                  also always provide you with access to the data submitted by
                  your users at your request.
                  <br />
                  <br />
                  PAXIV will protect the data you submit and will treat it
                  confidentially. This means that third parties cannot see the
                  data collected in PAXIV unless authorized by you.
                  <br />
                  <br />
                  When you upload lease information to Paxiv, you grant PAXIV
                  permission to aggregate that information, identify trends and
                  disclose those trends within analyses or reports we may
                  provide to our customers. Any such analysis or report, unless
                  authorized by you, will not include the owner details of any
                  submitted data and will not otherwise disclose information
                  sufficient to identifyspecific data you submit. We will apply
                  a “Rule of 3”. This means that PAXIV will only disclose
                  aggregated lease data based on information taken from 3 or
                  more properties, involving at least 3 different properties.
                  For example, a report provided by PAXIV analyzing effective
                  rents in Dallas, Texas would include aggregated effective rent
                  information taken from a minimum of 3 properties, and the
                  report would never disclose the specific details of the
                  property you submitted. In the event that you submit any
                  personal information to PAXIV, you hereby represent and
                  warrant that you have all consents necessary to share such
                  information.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  PAXIV Data
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  Any data or other research on or through PAXIV relies on data
                  submitted by its users or third party providers and you
                  acknowledge that it is only as accurate as the data provided
                  by PAXIV users and third parties and PAXIV does not warrant
                  the accuracy of said data. You will verify the data yourself
                  before relying on any information derived from PAXIV.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Map Data
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  Certain map data, including public transportation information,
                  is other parties, and is used with permission.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Links; Framing
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  You may provide a hyperlink to the home page of this Site,
                  which is&nbsp;
                  <a
                    className="font-semibold text-blue-600"
                    href="https://www.PAXIV.com"
                  >
                    www.PAXIV.com
                  </a>
                  , provided that you must remove any such link upon request
                  from PAXIV. Except as set forth in the preceding sentence, or
                  as otherwise authorized by PAXIV in writing, links to and the
                  framing of this Product or any of its Content is prohibited.
                  <br />
                  <br />
                  For your convenience, the Product may include links to other
                  sites, some of them owned and operated by PAXIV and some of
                  them owned and operated by third parties. Under no
                  circumstances shall PAXIV be deemed to be associated or
                  affiliated with, or viewed as endorsing or sponsoring, any web
                  site that links to this Site, or is linked to from this Site,
                  or any service or product that may be offered through such web
                  sites. PAXIV has not necessarily reviewed any or all of the
                  content of such other web sites, does not guarantee the
                  accuracy or timeliness of such sites, and disclaims
                  responsibility for the content and services available therein.
                  Different terms and conditions may apply to your use of any
                  linked sites. It is your responsibility to review any such
                  terms and conditions in connection with your use of any such
                  sites. Any issues or disputes that may arise with respect to
                  any such sites shall solely be between you and the applicable
                  third party.
                </div>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Information Regarding Accuracy, Completeness and Timeliness of
                  Information in the Product
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  The Product is provided for general information only and
                  should not be relied upon or used as the basis for making
                  significant decisions without consulting primary or more
                  accurate, more complete or more timely sources of information.
                  Any reliance upon the Product shall be at your own risk.
                  Neither we, nor any third party involved in creating,
                  producing or delivering the Product, is responsible if the
                  Product is not accurate, complete or current. Neither we, nor
                  any third party involved in creating, producing or delivering
                  the Product, has any responsibility for any consequence
                  relating directly or indirectly to any action or inaction that
                  you take based on the Product.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  No Warranties
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  ALTHOUGH PAXIV ATTEMPTS TO PROVIDE AN ACCURATE PRODUCT, THE
                  PRODUCT AND ALL PARTS THEREOF ARE PROVIDED “AS IS”, “WITH ALL
                  FAULTS” AND “AS AVAILABLE”. PAXIV (INCLUDING ITS AFFILIATES),
                  AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, AGENTS,
                  AND THIRD PARTY SUPPLIERS OR THEIR RESPECTIVE SUCCESSORS AND
                  ASSIGNS (COLLECTIVELY, THE “PAXIV PARTIES”) CANNOT AND DO NOT
                  REPRESENT, WARRANT OR COVENANT THAT
                  <p className="px-8 py-4">
                    <span>
                      (I) THE PRODUCT WILL ALWAYS BE ACCURATE, COMPLETE,
                      CURRENT, OR TIMELY;
                    </span>
                    <br />
                    <span>
                      (II) THE OPERATION OF, OR YOUR ACCESS TO, PRODUCT THROUGH
                      THE SITE WILL ALWAYS BE UNINTERRUPTED OR ERROR-FREE;
                      AND/OR
                    </span>
                    <br />
                    <span>
                      (III) DEFECTS OR ERRORS IN THE SITE ORTHE PRODUCT, BE THEY
                      HUMAN OR COMPUTER ERRORS, WILL BE CORRECTED.
                    </span>
                  </p>
                  <p>
                    THE PAXIV PARTIES DISCLAIM ANY AND ALL REPRESENTATIONS,
                    WARRANTIES OR GUARANTEES OF ANY KIND, WHETHER EXPRESS,
                    IMPLIED OR STATUTORY, INCLUDING WITHOUT LIMITATION
                  </p>
                  <div className="px-8 py-4">
                    (1) AS TO TITLE, MERCHANTABILITY, FITNESS FOR ORDINARY
                    PURPOSES AND FITNESS FOR A PARTICULAR PURPOSE,
                    NON-INFRINGEMENT, SYSTEM INTEGRATION, WORKMANLIKE EFFORT,
                    QUIET ENJOYMENT AND NO ENCUMBRANCES OR LIENS,
                    <br />
                    (2) THE QUALITY, ACCURACY, TIMELINESS OR COMPLETENESS OF THE
                    LICENSED PRODUCT,
                    <br />
                    (3) THOSE ARISING THROUGH COURSE OF DEALING, COURSE OF
                    PERFORMANCE OR USAGE OF TRADE;
                    <br />
                    (4) THE PRODUCT CONFORMING TO ANY FUNCTION, DEMONSTRATION OR
                    PROMISE BY ANY PAXIV PARTY, AND
                    <br />
                    (5) THAT ACCESS TO OR USE OF THE PRODUCT WILL BE
                    UNINTERRUPTED, ERROR-FREE OR COMPLETELY SECURE.BY VIEWING,
                    USING OR ACCESSING THE PRODUCT, INCLUDING BY USING ANY TOOL,
                    FORM OR AGREEMENT PROVIDED ON THE SITE, OR BY UPLOADING ANY
                    OTHER FORM OR AGREEMENT TO THE SITE, YOU
                    <br />
                    <br />
                    <p className="px-6">
                      (I) ACKNOWLEDGE THAT PAXIV IS NOT A PARTY TO THE
                      TRANSACTION CONTEMPLATED BY SUCH FORM OR AGREEMENT,
                    </p>
                    <p className="px-6">
                      (II) AGREE THAT THESE TERMS OF USE, INCLUDING THE WARRANTY
                      DISCLAIMERS, LIMITATIONS OF LIABILITY AND INDEMNIFICATION
                      SET FORTH IN THESE TERMS OF USE APPLY TO SUCH TOOLS, FORMS
                      AND AGREEMENTS AND YOUR USE THEREOF, AND
                    </p>
                    <p className="px-6">
                      (III) ACKNOWLEDGE THAT PAXIV PARTIES MAKE NO
                      REPRESENTATIONS OR WARRANTIES AS TO THE SUFFICIENCY, LEGAL
                      EFFECT OR ENFORCEABILITY OF ANY SUCH TOOLS, FORMS AND
                      AGREEMENTS AND BY YOUR USE OF THE SAME YOU CONFIRM THAT
                      YOU HAVE MADE YOUR OWN INDEPENDENT ANALYSIS OF THE
                      SUFFICIENCY, LEGAL EFFECT AND ENFORCEABILITY OF ANY SUCH
                      TOOLS, FORMS AND AGREEMENTSWITHOUT RELIANCE UPON PAXIV OR
                      PAXIV PARTIES. FURTHER, YOU ACKNOWLEDGE AND AGREE THAT
                      PAXIV PARTIES MAKE NO REPRESENTATIONS OR WARRANTIES AS TO
                      THE SUFFICIENCY, LEGAL EFFECT OR ENFORCEABILITY OF ANY
                      ELECTRONIC SIGNATURES INCLUDING, WITHOUT LIMITATION, WHAT
                      LAW MAY GOVERN ANY SUCH ELECTRONIC SIGNATURES AND YOU
                      CONFIRM THAT YOU HAVE MADE YOUR OWN INDEPENDENT ANALYSIS
                      OF THE SUFFICIENCY, LEGAL EFFECT, GOVERNING LAW AND
                      ENFORCEABILITY OF ANY SUCH ELECTRONIC SIGNATURES.
                    </p>
                  </div>
                  <br />
                  ANY RELIANCE UPON THE PRODUCT IS AT YOUR OWN RISK.
                  <br />
                  <br />
                  PAXIV RESERVES THE RIGHT TO RESTRICT OR TERMINATE YOUR ACCESS
                  TO THE PRODUCT OR ANY FEATURE OR PART THEREOF AT ANY TIME.
                </div>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Limitation of Liability
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW, THE PAXIV
                  PARTIES WILL NOT BE HELD LIABLE FOR ANY LOSS, COST OR DAMAGE
                  SUFFERED OR INCURRED BY YOU OR ANY THIRD PARTY INCLUDING
                  WITHOUT LIMITATION THOSE ARISING OUT OF OR RELATED TO ANY
                  FAULTS, INTERRUPTIONS OR DELAYS IN THE PRODUCT, OUT OF ANY
                  INACCURACIES, ERRORS OR OMISSIONS IN THE INFORMATION CONTAINED
                  IN THE PRODUCT, REGARDLESS OF HOW SUCH FAULTS, INTERRUPTIONS,
                  DELAYS, INACCURACIES, ERRORS OR OMISSIONS ARISE, OR FOR ANY
                  UNAUTHORIZED USE OF THE PRODUCT.
                  <br />
                  <br />
                  IF YOU DOWNLOAD ANY CONTENT FROM THIS PRODUCT, YOU DO SO AT
                  YOUR OWN DISCRETION AND RISK. NONE OF THE PAXIV PARTIES SHALL
                  BE LIABLE FOR ANY DAMAGES ARISING FROM, RELATING TO OR
                  RESULTING FROM THE PRODUCT, THESE TERMS OF USE, OR YOUR USE OR
                  INABILITY TO USE ANY OF THE FOREGOING. THESE LIMITATIONS OF
                  LIABILITY INCLUDE DAMAGES FOR ERRORS, OMISSIONS,
                  INTERRUPTIONS, DEFECTS, DELAYS, COMPUTER VIRUSES, LOSS OF
                  PROFITS, LOSS OF DATA, UNAUTHORIZED ACCESS TO AND ALTERATION
                  OF YOUR TRANSMISSIONS AND DATA, AND OTHER TANGIBLE AND
                  INTANGIBLE LOSSES.
                  <br />
                  <br />
                  NOTWITHSTANDING ANY PROVISION CONTAINED HEREIN TO THE
                  CONTRARY, AND TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE
                  LAW, IN NO EVENT WILL THE MAXIMUM AGGREGATE, CUMULATIVE
                  LIABILITY OF THE PAXIV PARTIES FOR ANY AND ALL REASONS TO ANY
                  PARTY FOR DAMAGES, DIRECT OR OTHERWISE, ARISING OUT OF OR IN
                  CONNECTION WITH THE PRODUCT, THESE TERMS OF USE, OR A SEPARATE
                  LICENSE AGREEMENT EXCEED THE TOTAL AMOUNT OF LICENSE FEES
                  ACTUALLY PAID TO PAXIV UNDER THE RELEVANT LICENSE AGREEMENT
                  BETWEEN THE RELEVANT PAXIV CLIENT AND PAXIV DURING THE TWELVE
                  MONTH PERIOD IMMEDIATELY PRECEDING THE DATE SUCH CLAIM AROSE,
                  REGARDLESS OF THE CAUSE OR FORM OF ACTION. RECOVERY OF THIS
                  AMOUNT SHALL BE THE SOLE AND EXCLUSIVE REMEDY FOR THE PAXIV
                  CLIENT OR ANY OTHER PARTY FOR ANY APPLICABLE DAMAGES.
                  <br />
                  <br />
                  TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW, UNDER NO
                  CIRCUMSTANCES WILL ANY OF THE PAXIV PARTIES BE HELD LIABLE FOR
                  ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY,
                  PUNITIVE OR ANY OTHER DAMAGES, INCLUDING, WITHOUT LIMITATION,
                  LOST PROFITS, ARISING OUT OF, BASED ON, OR RESULTING FROM, OR
                  IN CONNECTION WITH THE PRODUCT, THESE TERMS OF USE, OR YOUR
                  USE OR INABILITY TO USE ANY OF THE FOREGOING, EVEN IF PAXIV
                  HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE
                  FOREGOING EXCLUSION OF DAMAGES IS INDEPENDENT OF THE EXCLUSIVE
                  REMEDY DESCRIBED ABOVE AND SURVIVES IN THE EVENT SUCH REMEDY
                  FAILS.
                  <br />
                  <br />
                  NONE OF THE PAXIV PARTIES SHALL HAVE ANY LIABILITY FOR ANY
                  DAMAGES RESULTING FROM ANY FAILURE TO PERFORM ANY OBLIGATION
                  HEREUNDER OR FROM ANY DELAY IN THE PERFORMANCE THEREOF DUE TO
                  CAUSES BEYOND PAXIV'S CONTROL, INCLUDING, WITHOUT LIMITATION,
                  INDUSTRIAL DISPUTES, ACTS OF GOD OR GOVERNMENT, PUBLIC ENEMY,
                  WAR, FIRE, OTHER CASUALTY, FAILURE OF ANY LINK OR CONNECTION
                  WHETHER BY COMPUTER OR OTHERWISE, OR FAILURE OF TECHNOLOGY OR
                  TELECOMMUNICATIONS OR OTHER METHOD OR MEDIUM OF STORING OR
                  TRANSMITTING THE PRODUCT.
                  <br />
                  <br />
                  BY USING THE PRODUCT, YOU WAIVE AND RELEASE ALL OF THE PAXIV
                  PARTIES FROM ANY AND ALL LIABILITY OF ANY AND EVERY KIND OR
                  CHARACTER, KNOWN OR UNKNOWN, WHICH YOU MIGHT HAVE ASSERTED OR
                  ALLEGED AGAINST ANY OF THE PAXIV PARTIES BY REASON OF OR
                  ARISING OUT OFTHE PRODUCT OR YOUR USE THEREOF. THE WAIVERS AND
                  RELEASES SET FORTH IN THESE TERMS OF USE INCLUDE CLAIMS OF
                  WHICH YOU ARE PRESENTLY UNAWARE OR WHICH YOU DO NOT PRESENTLY
                  SUSPECT TO EXIST WHICH, IF KNOWN BY YOU, WOULD MATERIALLY
                  AFFECT YOUR WAIVER AND RELEASE SET FORTH ABOVE.
                  <br />
                  <br />
                  IF YOU ARE A CALIFORNIA RESIDENT, YOU SPECIFICALLY WAIVE
                  CALIFORNIA CIVIL CODE SECTION 1542, WHICH SAYS: "A GENERAL
                  RELEASE DOES NOT EXTEND TO CLAIMS THAT THE CREDITOR OR
                  RELEASING PARTY DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR
                  HER FAVOR AT THE TIME OF EXECUTING THE RELEASE AND THAT, IF
                  KNOWN BY HIM OR HER, WOULD HAVE MATERIALLY AFFECTED HIS OR HER
                  SETTLEMENT WITH THE DEBTOR OR RELEASED PARTY."
                  <br />
                  <br />
                  THESE FOREGOING LIMITATIONS APPLY WHETHER BASED ON BREACH OF
                  CONTRACT, BREACH OF WARRANTY, TORT (INCLUDING
                  NEGLIGENCE),PRODUCT LIABILITY OR OTHERWISE, EVEN IF THE PAXIV
                  PARTIES WERE NEGLIGENT OR HAVE BEEN ADVISED OF THE POSSIBILITY
                  OF SUCH DAMAGES.
                  <br />
                  <br />
                  THE NEGATION OF DAMAGES SET FORTH ABOVE IS A FUNDAMENTAL
                  ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN PAXIV AND YOU. THE
                  PRODUCT WOULD NOT BE PROVIDED TO YOU WITHOUT SUCH LIMITATIONS.
                  NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY
                  YOU FROM PAXIV THROUGH THE PRODUCT CREATE ANY WARRANTY,
                  REPRESENTATION AND/OR GUARANTEE NOT EXPRESSLY STATED IN THIS
                  AGREEMENT.
                  <br />
                  <br />
                  NO ACTION ARISING OUT OF OR PERTAINING TO THESE TERMS OF USE
                  MAY BE BROUGHT MORE THAN ONE (1) YEAR AFTER THE CAUSE OF
                  ACTION HAS ARISEN
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  User Data
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  If you create any settings, saved searches, fields or
                  functions in the Product or input, add or export any datainto
                  or from the Product (collectively, the "User Data"), none of
                  the PAXIV Parties shall have any liability or responsibility
                  for any of such User Data, including the loss, destruction or
                  use by third parties of such User Data. It is your
                  responsibility to make back-up copies of such User Data.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Your Liability
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  If you cause a technical disruption of the Product, you agree
                  to be responsible for any and all liabilities, costs and
                  expenses (including reasonable attorneys' fees, fines, and
                  costs of enforcement) arising from or related to that
                  disruption. Upon your breach of any term of these Terms of Use
                  or a separate License Agreement, PAXIV's remedies shall
                  include any damages and relief available at law or in equity
                  as well as interruption and/or termination of your access to
                  the Product or any portion thereof and permanent deletion or
                  destruction of all portions of the Product within your
                  possession, custody or control. If PAXIV retains any third
                  party to obtain any remedy to which it is entitled under these
                  Terms of Use or a separateLicense Agreement, PAXIV shall be
                  entitled to recover all costs, including attorney's fees or
                  collection agency commissions, PAXIV incurs.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Indemnity
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  You agree to indemnify, defend, and hold harmless the PAXIV
                  Parties from and against any third party action, suit, claim
                  or demand and any associated losses, expenses, damages, costs
                  and other liabilities (including reasonable attorneys' fees),
                  arising out of or relating to your (and your users') Submitted
                  Content, use or misuse of any portion of the Product, or your
                  violation of these Terms of Use or a separate License
                  Agreement. You shall cooperate as fully as reasonably required
                  in the defense of any such claim or demand. PAXIV and any
                  third party involved in creating, producing, or delivering the
                  Product reserves the right to assume the exclusive defense and
                  control of any matter otherwise subject to indemnification by
                  you, at your expense, and you shall not in any event settle
                  any such matter without the written consent of PAXIV and any
                  such third party.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Privacy
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  PAXIV is committed to respecting the privacy of your personal
                  information in connection with your use of this Site. We take
                  great care to keep your personal information confidential and
                  secure. However, the Internet is not a totally secure medium
                  of communication. For this reason, we cannot guarantee the
                  privacy of any information you input on this site, send to us,
                  or request be delivered to you on the Internet. PAXIV will not
                  be responsible for any damages you or others may suffer as a
                  result of the loss of confidentiality of any such information.
                  <br />
                  <br />
                  Use of the Product is subject to PAXIV’s Privacy Notice,
                  located at&nbsp;
                  <a
                    className="font-semibold text-blue-600"
                    href="https://www.PAXIV.com"
                  >
                    www.PAXIV.com
                  </a>
                  ,which is hereby incorporated into, and made part of, these
                  Terms of Use. PAXIV reserves the right, and you authorize us,
                  to use the Product and any and all other personal information
                  provided by you in any manner consistent with our Privacy
                  Notice.
                  <br />
                  <br />
                  PAXIV may send to you and your employees, communications,
                  including, but not limited to, email communications about new
                  features or products, available real estate listings, product
                  feedback and other marketing content, which you may
                  unsubscribe from at any time. PAXIV prohibits the use of our
                  system or its tools to generate or send unsolicited commercial
                  communication or any commercial communication that would
                  violate the anti-spam law or regulation (a “law”) of any
                  country (“spam”). You may not use the PAXIV’s communication
                  services that PAXIV offers or supports to send spam or
                  otherwise send content that would violate these Terms and
                  Conditions including any applicable spam law. By using PAXIV’s
                  communication services, you agree to send communication only
                  to those who have given you, and you have, consent to send the
                  communication or to those who you are otherwise permitted
                  under applicable law to send such communication, the
                  communication will contain all of the information such as a
                  link to your privacy policy and a functioning unsubscribe
                  mechanism required by law, and you will have a functioning
                  unsubscribe mechanism and you will give effect to any request
                  to unsubscribe from receiving future commercial emails, as
                  required by law. PAXIV has the right, but not the obligation,
                  to revoke the privileges of any party who breaches these
                  terms. Subscription to PAXIV indicates your willingness to
                  receive communication from other PAXIV Authorized users.
                  <br />
                  <br />
                  By using PAXIV’s services and agreeing to these terms of use,
                  you consent to the recording of your telephone or other
                  communications with PAXIV representatives, including research,
                  customer service and sales personnel, for training, quality
                  assurance and archival purposes.
                </div>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Global Privacy
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  If you are a PAXIV user located in the European Economic Area,
                  Switzerland or United Kingdom and PAXIV processes personal
                  data on your behalf (e.g., if you send emails to contacts
                  through the PAXIV platform for certain products or features),
                  then the Data Processing Addendum shall apply to all such
                  processing undertaken by PAXIV on your behalf.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Trademarks
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  The Product employs various trademarks and service marks of
                  PAXIV and of other third parties. All of these trademarks and
                  service marks are the property of their respective owners. You
                  agree not to use or display them in any manner without the
                  prior written permission of the applicable trademark owner.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Procedure for Making Notification of Claims of Copyright
                  Infringement
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  PAXIV respects the intellectual property of others, and we ask
                  those posting or transmitting any content to or through this
                  Site to respect copyright law. It is the policy of PAXIV to
                  restrict and/or terminate in appropriate circumstances the
                  ability to submit content and/or use this Product by
                  individuals or entities that repeatedly submit infringing
                  content in violation of these Terms of Use. If you believe
                  that your work has been copied and is available on this Site
                  or our other online services in a way that constitutes
                  copyright infringement, you may notify PAXIV according tothe
                  notice requirements of the Digital Millennium Copyright Act
                  and any other applicable law. Pursuant to 17 U.S.C. Section
                  512, PAXIV’s DMCA registered agent can be reached as follows:
                  by mail to Legal Department (attn: General Counsel), PAXIV,
                  LLC, 1840 N Technology Drive, Springville, Utah 84663-4956; by
                  e-mail to
                  <a
                    className="font-semibold text-blue-600"
                    href="mailto:copyright@PAXIV.com"
                  >
                    &nbsp;copyright@PAXIV.com
                  </a>
                  ;.
                </div>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Ownership
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  You acknowledge that PAXIV and its licensors have and shall
                  retain exclusive ownership of all proprietary rights in or to
                  the Product, including all Canadian and international
                  intellectual property and other rights such as patents,
                  trademarks, copyrights and trade secrets. This is a license
                  agreement and not an agreement for sale. You shall have no
                  right or interest in any portion of the Product except the
                  right to use the Product as set forth in these Terms of Use
                  and, if you are a PAXIV Client, your License Agreement. You
                  acknowledge that the Software, Database, Content, Information,
                  Passcode Protected Product, Non-Passcode Protected Product,
                  and Product constitute the valuable property and confidential
                  copyrighted information of PAXIV and its licensors
                  (collectively, the "Proprietary Information"). You agree to
                  (a) comply with all copyright, trademark, trade secret,
                  patent, contract and other laws necessary to protect all
                  rights in the Proprietary Information, (b) not challenge
                  PAXIV's and its licensor's ownership of (or the validity or
                  enforceability of their rights in and to) the Proprietary
                  Information, and (c) not remove, conceal, obliterate or
                  circumvent any copyright or other notice or license, use or
                  copying technological measure or rights management information
                  included in the Product. You shall be liable for any violation
                  of the provisions of these Terms of Use and, if applicable,
                  the License Agreement by your employees, Independent
                  Contractors, affiliates and agents and for any unauthorized
                  use of the Product by such persons. Nothing in these Terms of
                  Use will restrict PAXIV from freely using for any purpose,
                  without compensation, any of your ideas, suggestions,
                  enhancements or other feedback relating to the Licensed
                  Product or new PAXIV products, features or tools, or any
                  portion thereof.
                  <br />
                  <br />
                  NOTICE -- U.S. Government Rights/Commercial Technical Data and
                  Software Unpublished, Rights Reserved Under the Copyright Laws
                  of the United States
                  <br />
                  <br />
                  This Site contains commercial technical data and computer
                  software that have been privately developed and are normally
                  vended commercially under a license or lease agreement
                  restricting their use, disclosure and reproduction. In
                  accordance with FAR 12.211, 12.212, 27.405(b)(2) and 52.227-19
                  and DFARS 227.7202, 227.7102 and 252.227-7015, as well as
                  other applicable supplemental agency regulations, use,
                  reproduction, disclosure and dissemination of this commercial
                  technical data and computer software are governed strictly in
                  accordance with PAXIV's commercial license agreements,
                  including these Terms of Use.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Export Restrictions
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  This Site is controlled and operated by PAXIV from its offices
                  within the United States. PAXIV makes no representation that
                  any portion of the Product or othermaterial accessed through
                  this Site is appropriate, enforceable, compliant with local
                  law, or available for use, in other locations, and access to
                  them from other countries where their contents are illegal is
                  prohibited. Those who choose to access the Product or the Site
                  from other locations do so on their own volition and are
                  responsible for compliance with applicable local laws. You may
                  not export or re-export any portion of the Product except in
                  full compliance with all applicable laws and regulations, this
                  Terms of Use, and, if applicable, the associated License
                  Agreement. In particular, no portion of the Product may be
                  exported or re-exported in violation of the sanctions, export
                  control laws and regulations of any applicable country, or
                  exported or re-exported into (or to a national or resident of)
                  any country to which the United States embargoes goods, or to
                  anyone on the U.S. Treasury Department's list of Specially
                  Designated Nationals or the U.S. Commerce Department's Table
                  of Denial Orders.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Sweepstakes
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  From time to time, PAXIV conducts sweepstakes that entitle the
                  winners to prizes. Each sweepstakes has its own terms and
                  conditions, set forth in the "official rules" for that
                  sweepstakes.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Jurisdiction
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  PAXIV is headquartered in the State of Utah of the United
                  States. These Terms of Use and your use of this Product shall
                  be governed by the laws of the State of Utah without regard to
                  its conflicts of laws principles. Unless otherwise agreed to
                  in writing, the federal and state courts located in the State
                  of Utah shall be the exclusive jurisdiction for any action
                  brought against PAXIV in connection with these Terms of Use or
                  use of the Product. You irrevocably consent to the
                  jurisdiction and venue of the federal and state courts located
                  in the State of Utah, and to the jurisdiction of the federal,
                  provincial and/or state courts located in any State or
                  Province where you are located, for any action brought against
                  you in connection with these Terms of Use or use of the
                  Product. All disputes arising outside of the United States
                  shall be settled by arbitration held in the State of Utah and
                  in accordance with the Rules of Arbitration and Conciliation
                  of the International Chamber of Commerce. All arbitrators
                  shall be fluent in English and all documents submitted in
                  connection with the arbitration shall be in English. Judgment
                  upon an arbitration award may be entered in any court having
                  jurisdiction, or application may be made to such court for a
                  judicial acceptance of the award and an order of enforcement.
                  If any material in this Product, or your use of the Product,
                  is contrary to the laws of the place where you are when you
                  access it, or if PAXIV is not Licensed as required by
                  applicable laws or regulations in such locale, the Product is
                  not intended for you, and we ask you not to use the Product.
                  You are responsible for informing yourself of, and complying
                  with, the laws of your jurisdiction.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Modifications to Product; Changes to these Terms
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  Regardless of any other provision herein, PAXIV is
                  continuously updating and changing the Product, and reserves
                  the right at any time and from time to time tomodify or
                  discontinue, temporarily or permanently, the Product (or any
                  part thereof) with or without notice. You agree that PAXIV
                  shall not be liable to you or to any third party for any
                  modification, suspension or discontinuance of the Product (or
                  any part thereof). Additionally, we reserve the right, in our
                  complete and sole discretion, to change these Terms of Use at
                  any time by posting revised terms on the Product. It is your
                  responsibility to check periodically for any changes we may
                  make to the Product and these Terms of Use. Your continued use
                  of this Product following the posting of changes to these
                  terms or other policies means you accept the changes.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Termination
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  The restrictions imposed on you with respect to information or
                  materials viewed and/or downloaded in respect of the Product
                  and the disclaimers, indemnities, waivers, releases and
                  limitations of liabilities set forth above shall survive
                  termination or suspension of these Terms of Use for any
                  reason.
                </p>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <h1 className="text-primary text-3xl kl:text-6xl font-semibold tracking-[5px] kl:tracking-[10px] leading-10 kl:leading-[80px] pt-6 kl:pt-12">
                  Miscellaneous
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl leading-6 sm:leading-8 kl:leading-[45px]">
                  These Terms of Use contain the entire understanding of the
                  parties with respect to the Product and supersede any prior
                  oral or written statements and documents with respect to such
                  subject matter, provided that these Terms of Use do not
                  supersede any written License Agreement between the
                  parties.Your obligations hereunder are binding on your
                  successors, legal representatives and assigns. You may not
                  assign or transfer (by operation of law or otherwise) these
                  Terms of Use or any portion hereunder, in whole or in part,
                  without the prior written consent of PAXIV. In the event any
                  portion of these Terms of Use not being of a fundamental
                  nature is held to be invalid, illegal or unenforceable, such
                  part shall be deemed severed from these Terms of Use without
                  invalidating the remaining provisions of these Terms of Use or
                  affecting the enforceability of such remaining provisions. If
                  a provision is held to be invalid, illegal or otherwise
                  unenforceable, it shall be deemed to be replaced with an
                  enforceable provision that retains theintent and benefits of
                  the original provision. Any consent by PAXIV to, or waiver of,
                  a breach of a right, term or provision of these Terms of Use,
                  whether express or implied, shall not constitute a consent to,
                  or waiver of, any other, different or subsequent breach.
                  Headings are for reference only. The use of and access to the
                  Product is available only to individuals who can enter into
                  legally binding contracts under applicable law. All notices to
                  PAXIV pertaining to these Terms of Use will be in writing,
                  mailed by registered or certified mail, return receipt
                  requested, or delivered by a well-recognized overnight United
                  States, Canadian or other international carrier, delivered to
                  PAXIV, LLC, PAXIV, LLC, 1840 N Technology Drive, Springville,
                  Utah 84663-4956, attention: General Counsel.
                  <br />
                  <br />
                  <br />
                  <p>
                    Thank you for visiting&nbsp;
                    <span className="font-bold">PAXIV.com</span>.
                  </p>
                  <br />
                  <p className="font-bold">Last Revised: September 15, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </BaseContainer>
        <FooterAdmin />
        <TopDownButton />
      </main>
    </>
  );
};

export default Terms;
