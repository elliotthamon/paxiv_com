import { useRef } from "react";
import Head from "next/head";
import Image from "next/image";

import BaseContainer from "@/components/BaseContainer";
import Header from "@/components/Header";
import TopDownButton from "@/components/TopDownButton";
import FooterAdmin from "@/components/admin/FooterAdmin";

const Privacy = () => {
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const fourthRef = useRef(null);
  const fifthRef = useRef(null);
  const sixthRef = useRef(null);
  const seventhRef = useRef(null);
  const eighthRef = useRef(null);
  const ninethRef = useRef(null);
  const tenthRef = useRef(null);

  const smoothScrollToFirst = () => {
    if (firstRef.current) {
      // @ts-ignore
      firstRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const smoothScrollToSecond = () => {
    if (secondRef.current) {
      // @ts-ignore
      secondRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const smoothScrollToThird = () => {
    if (thirdRef.current) {
      // @ts-ignore
      thirdRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const smoothScrollToFourth = () => {
    if (fourthRef.current) {
      // @ts-ignore
      fourthRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const smoothScrollToFifth = () => {
    if (fifthRef.current) {
      // @ts-ignore
      fifthRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const smoothScrollToSixth = () => {
    if (sixthRef.current) {
      // @ts-ignore
      sixthRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const smoothScrollToSeventh = () => {
    if (seventhRef.current) {
      // @ts-ignore
      seventhRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const smoothScrollToEighth = () => {
    if (eighthRef.current) {
      // @ts-ignore
      eighthRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const smoothScrollToNineth = () => {
    if (ninethRef.current) {
      // @ts-ignore
      ninethRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const smoothScrollToTenth = () => {
    if (tenthRef.current) {
      // @ts-ignore
      tenthRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Head>
        <title>Privacy Policy | Paxiv</title>
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
            <h1 className="text-4xl sm:text-[50px] kl:text-[100px] text-white font-semibold tracking-[15px] kl:tracking-[30px] uppercase text-center mt-20 lg:mt-28 kl:mt-[350px]">
              Global Privacy Notice&nbsp;
            </h1>
            <div className="bg-white px-4 sm:px-12 kl:px-24 py-10 kl:py-20 rounded-[28px] mt-[200px] sm:mt-[250px] kl:mt-[500px]">
              <div className="flex flex-col">
                <div className="text-base sm:text-base sm:text-xl kl:text-4xl leading-8 kl:leading-[45px] mt-4">
                  Last Modified: January 17, 2023
                  <br />
                  As the leading provider of information, analytics, and online
                  marketplaces to the commercial real estate industry, PAXIV,
                  LLC and our affiliates (collectively, “PAXIV,” “we,” or “us”)
                  respect your privacy and are committed to protecting your
                  Personal Information. This Global Privacy Notice describes the
                  types of Personal Information we collect and our practices for
                  using, maintaining, sharing, and protecting it. It also
                  describes the rights and choices you may have with respect to
                  your Personal Information and how you may contact us about our
                  privacy practices. Our privacy practices may vary among the
                  countries in which we operate to reflect local practices and
                  legal requirements, and specific privacy practices may apply
                  to some of our products and services.
                  <br />
                  <br />
                  This Global Privacy Notice applies to the following websites
                  and any associated PAXIV websites, products, services, and
                  mobile applications (the “Services”):PAXIV.com. It does not
                  apply to the collection and use of certain employment-related
                  information. If you are a current or former PAXIV job
                  applicant, employee, owner, director, officer, or contractor,
                  please Contact Us for the appropriate policy.
                  <br />
                  <br />
                  When using our websites, you may choose to interact with
                  features from third parties that operate independently from
                  PAXIV, such as social media widgets and links to third-party
                  websites. PAXIV has no control over and is not responsible for
                  the privacy practices of such third parties. This Global
                  Privacy Notice does not apply to the extent PAXIV does not own
                  or control any linked websites or features you visit or use.
                  We recommend that you familiarize yourself with the privacy
                  practices of these third parties.
                  <br />
                  <br />
                  <div className="px-6 kl:px-12">
                    <span className="text-2xl sm:text-3xl kl:text-6xl font-semibold">
                      Table of Contents
                    </span>
                    <div className="px-4 kl:px-8 space-y-3 kl:space-y-6 pt-5 kl:mt-10">
                      <div
                        className="text-xl sm:text-2xl kl:text-5xl cursor-pointer hover:underline"
                        onClick={smoothScrollToFirst}
                      >
                        1. Types of Personal Information
                      </div>
                      <div
                        className="text-xl sm:text-2xl kl:text-5xl cursor-pointer hover:underline"
                        onClick={smoothScrollToSecond}
                      >
                        2. Collection of Personal Information
                      </div>
                      <div
                        className="text-xl sm:text-2xl kl:text-5xl cursor-pointer hover:underline"
                        onClick={smoothScrollToThird}
                      >
                        3. Use of Personal Information
                      </div>
                      <div
                        className="text-xl sm:text-2xl kl:text-5xl cursor-pointer hover:underline"
                        onClick={smoothScrollToFourth}
                      >
                        <span>4. Disclosure of Personal Information</span>
                      </div>
                      <div
                        className="text-xl sm:text-2xl kl:text-5xl cursor-pointer hover:underline"
                        onClick={smoothScrollToFifth}
                      >
                        5. International Transfer of Personal Information
                      </div>
                      <div
                        className="text-xl sm:text-2xl kl:text-5xl cursor-pointer hover:underline"
                        onClick={smoothScrollToSixth}
                      >
                        6. Security of Personal Information
                      </div>
                      <div
                        className="text-xl sm:text-2xl kl:text-5xl cursor-pointer hover:underline"
                        onClick={smoothScrollToSeventh}
                      >
                        7. Retention of Personal Information
                      </div>
                      <div
                        className="text-xl sm:text-2xl kl:text-5xl cursor-pointer hover:underline"
                        onClick={smoothScrollToEighth}
                      >
                        8. Manage Your Personal Information
                      </div>
                      <div
                        className="text-xl sm:text-2xl kl:text-5xl cursor-pointer hover:underline"
                        onClick={smoothScrollToNineth}
                      >
                        9. Global Policy Notice Changes
                      </div>
                      <div
                        className="text-xl sm:text-2xl kl:text-5xl cursor-pointer hover:underline"
                        onClick={smoothScrollToTenth}
                      >
                        10. Contact Us
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-10 kl:mt-20" ref={firstRef}>
                <h1 className="text-primary text-2xl sm:text-3xl kl:text-6xl font-semibold tracking-[6px] sm:tracking-[10px] kl:tracking-[15px] leading-8  sm:leading-10 kl:leading-[60px] pt-6 kl:pt-12">
                  1. Types of Personal Information
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  “Personal Information” means any information directly or
                  indirectly relating to an identified or identifiable
                  individual. Examples of Personal Information PAXIV may collect
                  include:
                  <br />
                  Payment information (credit card and other payment card
                  information)
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    ● Personal contact information (name, nickname, gender,
                    mailing address, email address, phone number)
                    <br />
                    ● Business information (office location, business contact
                    information, department, job title/description, professional
                    bio)
                    <br />
                    ● Log-in credentials (username, password)
                    <br />
                    ● Photographs and biometric data (facial geometry)
                    <br />
                    ● Usage details (log-on activity, search terms, views,
                    clicks, downloads, PAXIV-related preferences, leadsubmission
                    information, cursor movement, scrolling activity and other
                    related attributes)
                    <br />
                    ● Technical details (IP address, geolocation information,
                    cookie/session IDs, authentication information, browser
                    type/version, operating system/platform)
                    <br />● Any other information you or other PAXIV customers
                    may upload or enter into to the Services
                  </p>
                </div>
              </div>
              <div className="flex flex-col mt-6">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Service-Specific
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV Information and Analytics Through our PAXIV information
                  services and analytics services, we may additionally collect:
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    ● Country code, location name, and contact ID
                    <br />
                    ● Business history, investor type, prior companies,
                    credentials, and phone call recordings
                    <br />● Phone call and video conference recordings
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  California Residents
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  We collect Personal Information as defined by the California
                  Consumer Privacy Act, which is information that identifies,
                  relates to, describes, is reasonably capable of being
                  associated with, or could reasonably be linked, directly or
                  indirectly, with a particular consumer orhousehold. Personal
                  Information does not include de-identified or aggregate
                  information, publicly-available information that is lawfully
                  made available from federal, state, or local government
                  records, and information covered by certain sector-specific
                  privacy laws. PAXIV has collected the following categories of
                  Personal Information about consumers in the 12 months
                  preceding the date this Global Privacy Notice was last
                  modified:
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    ● Identifiers (e.g., real name, alias, postal address,
                    unique personal identifier, online identifier, IP address,
                    email address, account name, or other similar identifiers)
                    <br />
                    ● Categories of personal information described in California
                    Civil Code §1798.80(e) (e.g., signature, telephone number,
                    bank account number, credit card number, debit card number,
                    or other financial information)
                    <br />
                    ● Commercial information (e.g., records of personal
                    property, products or services purchased, obtained, or
                    considered, or other purchasing or consuming histories or
                    tendencies)
                    <br />
                    ● Internet or other electronic network activity information
                    <br />
                    ● Geolocation data
                    <br />
                    ● Professional or employment-related information
                    <br />
                    ● Inferences drawn from other Personal Information (e.g.,
                    profile reflecting your preferences, characteristics, and
                    behavior)
                    <br />● Sensitive personal information, including: biometric
                    information, precise geolocation, login credentials
                    (username and password), and the content of messages sent
                    through the Services
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-6" ref={secondRef}>
                <h1 className="text-primary text-2xl sm:text-3xl kl:text-6xl font-semibold tracking-[6px] sm:tracking-[10px] kl:tracking-[15px] leading-8  sm:leading-10 kl:leading-[60px] pt-6 kl:pt-12 pb-4">
                  2. Collection of Personal Information
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV may collect Personal Information using the following
                  methods:
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    ● Directly from you when you provide it to us (information
                    you enter into web forms, participation in phone calls or
                    video conferences, subscription agreements, and contracts or
                    submit to the Services)
                    <br />
                    ● Through your participation in surveys, promotions, and
                    contests
                    <br />
                    ● PAXIV&apos;s internal customer relationship management
                    system and databases
                    <br />
                    ● From third parties, such as analytics and email marketing
                    service providers
                    <br />
                    ● Researching public websites where permitted by the Terms
                    of Use (company websites, search engines, social media)
                    <br />● Automatically through tracking technologies
                    (cookies, web beacons, log files), including over time and
                    across third-party websites or other online services For
                    more information about how we use Personal Information
                    collected through tracking technologies and the ways you may
                    be able to manage it, see Use of Personal Information, our
                    Cookie Policy, andManage Your Personal Information.
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-6">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Service-Specific
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV Email Advertising Products
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    ● Marketing, Investment Development and Third Party
                    Advertising: We collect Personal Information from
                    individuals whose details are on our database and who are
                    most likely to be either a commercial or private investor.
                    <br />
                    ● Secondary Corporate Marketing: We collect Personal
                    Information from individuals whose details are on our
                    databases.
                    <br />
                    ● Weekly Property Marketing: We collect Personal Information
                    from individuals whose details are on our database and who
                    are most likely to be either a commercial or private
                    investor.
                    <br />
                    ● Retail: We collect Personal Information from individuals
                    whose details are on our database and who will be either
                    commercial or private individuals. Privacy practices related
                    to our marketplace are detailed in theMarketplace Global
                    Privacy Notice. PAXIV Information and Analytics We may
                    additionally collect Personal Information in the following
                    ways specific to PAXIV Information and Analytics:
                    <br />
                    ● Extracting information from past registrations
                    <br />
                    ● For Personal Information about a user through agents,
                    owners, property managers, developers, asset managers and
                    architects; from clients or other contacts (including, among
                    others, admins, colleagues, joint agents brochures) with
                    updated contact information; search engine searches; or from
                    a listing Broker&apos;s website
                    <br />● For Personal Information about corporate tenants and
                    landlords, from corporate tenants, landlords, building
                    managers, front desk/concierge, and neighboring tenants;
                    LinkedIn or other social media (business Facebook page,
                    Twitter); paid third-party providers; public and freely
                    accessible databases such as statewebsites; published agent
                    investment brochures and tenancy schedules; search engine
                    searches; or from a corporate tenant&apos;s or
                    landlord&apos;s website.
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Biometric and Geolocation Information
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  Some areas of PAXIV Services may require you to opt-in to
                  PAXIV collecting photos, facial geometry, and geolocation
                  information from you when you log in to certain PAXIV
                  Services. This information is used to authenticate you as the
                  user of such Services, maintain a secure session, and detect
                  potential abuse and fraudulent use of the Services. For
                  example, PAXIV may scan and analyze a photo you submit to the
                  Services to confirm your identity for security purposes each
                  time you access the Services by using facial recognition
                  technology to compare your photo to the most recent photo
                  uploaded to your account. PAXIV will securely store this
                  information on servers located in the United States, and this
                  information will only be accessed by authorized PAXIV
                  employees. We will retain biometric information until the
                  initial purpose forcollecting or obtaining such information
                  has been satisfied or within three years, whichever occurs
                  first. If you have questions regarding PAXIV&apos;s use of
                  biometric or geolocation information, please Contact Us.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Children Under 16
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV websites are not intended for children under 16 years of
                  age, and we do not knowingly collect Personal Information from
                  children under 16. If you are under 16, do not use or provide
                  any information on this website or through any of its
                  features, register, or make any purchases. If we learn we have
                  collected or received Personal Information from a child under
                  16 without verification of parental consent, we will delete
                  it. If you believe we might have any Personal Information from
                  or about a child under 16, please Contact Us.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  California Residents
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV collects Personal Information from the following
                  categories of sources:
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    ● Directly and indirectly from you
                    <br />
                    ● Other PAXIV customers
                    <br />
                    ● Service providers, including data analytics providers
                    <br />
                    ● Third parties, including advertising services and social
                    media networks
                    <br />
                    ● Consumer reporting agencies
                    <br />
                    ● Companies with public websites
                    <br />● Government entities
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  European Economic Area (EEA) and United Kingdom Residents
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  Where we need to collect Personal Information by law or under
                  the terms of a contract we have with you and you fail to
                  provide that information when requested, we may not be able to
                  perform the contract we have or are trying to enter into with
                  you. In this case, we may have to cancel a product or service
                  you have with us but will notify you first.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20" ref={thirdRef}>
                <h1 className="text-primary text-2xl sm:text-3xl kl:text-6xl font-semibold tracking-[6px] sm:tracking-[10px] kl:tracking-[15px] leading-8  sm:leading-10 kl:leading-[60px] pt-6 kl:pt-12 pb-4">
                  3. Use of Personal Information
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  We may use your Personal Information for the following
                  purposes:
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    ● Communicating with you
                    <br />
                    ● Providing you with the Services
                    <br />
                    ● Authenticating use, detecting potential fraudulent use,
                    and otherwise maintaining the security of the Services
                    <br />
                    ● Developing, testing, improving, and demonstrating the
                    Services
                    <br />
                    ● Creating and maintaining a customer relationship
                    management system, member directories, and invitation lists
                    for PAXIV events
                    <br />
                    ● Carrying out our legal and contractual obligations and
                    enforcing our rights, including billing and payment
                    processing
                    <br />
                    ● Anonymizing and aggregating information for analytics and
                    reporting
                    <br />
                    ● Advertising, marketing, and selling the Services,
                    including linking together or merging Personal Information
                    with other Personal Information so that we may better
                    understand your needs and inform you about our Services and
                    those of our partners
                    <br />
                    ● Short-term transient use, as defined in the California
                    Consumer Privacy Act of 2018
                    <br />● Any other purpose with your consent
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Service-Specific
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV Information and AnalyticsWe may use Personal Information
                  for the following additional purposes in connection with PAXIV
                  Information and Analytics products:
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    ● Populating and updating email lists
                    <br />
                    ● Advising clients of PAXIV product enhancements and
                    improvements
                    <br />
                    ● Contacting users to collect listing, deal and other
                    industry data on a monthly basis
                    <br />
                    ● Entering details into PAXIV® where those details can be
                    viewed by our subscriber base and used for marketing
                    purposes
                    <br />
                    ● Identifying trends, aggregating statistics, optimizing
                    your use of the Services and providing a safer environment
                    for purchasing in connection with your use of PAXIV.com and
                    its related services
                    <br />● Training and quality assurance PAXIV Applications
                    Through PAXIV Applications, PAXIV stores information
                    uploaded and entered into the applications by PAXIV
                    customers for their own purposes (property records, tax
                    documents, property and prospect contacts, listings,
                    deal/lease information, free form notes, etc.) on behalf of
                    PAXIV&apos;s customers as a data processor.PAXIV uses this
                    information for the purpose of interacting with current and
                    prospective clients, tracking engagement, and for customer
                    support activities.
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Online Advertising
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  When you use the Services, we and third parties may use
                  cookies and other tracking technologies to collect
                  information, including Personal Information, to help us target
                  content to you on the Services or elsewhere. This information
                  may be associated with other information or combined with
                  information from other sources, including information these
                  third parties might track about your online activities over
                  time and across the Internet. Third parties use this
                  information to provide interest-based display advertising and
                  retargeting on our behalf, which may include placing our
                  advertisements on other websites you visit, including your
                  social media accounts, or matching a cookie or device ID to
                  your email address so we can send you promotional emails that
                  may be of interest to you.
                  <br />
                  To make informed choices about targeted advertising, see our
                  Cookie Policy and Manage Your PErsonal Information.
                  <br />
                  <br />
                  European Economic Area (EEA) and United Kingdom Residents
                  <br />
                  <br />
                  We rely on the following lawful bases to process your Personal
                  Information for these non-exhaustive purposes:
                  <br />
                  <br />
                  Consent
                  <br />
                  <br />
                  We may obtain your consent to process your Personal
                  Information in certain circumstances, which may include when
                  we send you relevant marketing, you elect to receive
                  information from us, or you contact us to register an interest
                  in our Services or company. We may also rely upon our
                  legitimate interest in developing our business as a basis for
                  sending you marketing information and information about our
                  Services (see below).
                  <br />
                  <br />
                  Performance of a Contract
                  <br />
                  <br />
                  We rely on this lawful processing ground when we process your
                  Personal Information to perform a contract which we have with
                  you, or when we take steps in anticipation of entering into a
                  contract with you, for example in connection with the
                  provision of our Services to you and the management of our
                  relationships with third parties.
                  <br />
                  <br />
                  Compliance with a Legal Obligation
                  <br />
                  <br />
                  We rely on this lawful processing ground when we process your
                  Personal Information to meet legal and regulatory obligations
                  which apply to us.
                  <br />
                  <br />
                  Legitimate Interests
                  <br />
                  <br />
                  We rely on this lawful processing ground when we process your
                  Personal Information to provide our Services, to respond to
                  specific requests, to manage our business operations, to
                  manage our relationships with you and with third parties in
                  connection with our business, and when weprovide you with
                  marketing information or other information in relation to our
                  Services which we believe may interest you. If you wish to
                  have more information regarding the legitimate interests
                  assessments we have conducted in order to reach these
                  conclusions, please Contact Us.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20" ref={fourthRef}>
                <h1 className="text-primary text-2xl sm:text-3xl kl:text-6xl font-semibold tracking-[6px] sm:tracking-[10px] kl:tracking-[15px] leading-8  sm:leading-10 kl:leading-[60px] pt-6 kl:pt-12 pb-4">
                  4. Disclosure of Personal Information
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  We may disclose Personal Information:
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    ● To affiliates and other entities within PAXIV&apos;s group
                    of companies, distribution partners, other PAXIV customers,
                    and service providers
                    <br />
                    ● To third parties when you use a third party feature in our
                    Services
                    <br />
                    ● To enforce or apply our Terms of Use and other agreements
                    or comply with any court order, law, or legal process,
                    including government or regulatory requests
                    <br />
                    ● To a buyer or other successor in the event of a merger,
                    divestiture, restructuring, reorganization, dissolution, or
                    other sale or transfer of some or all of PAXIV&apos;s assets
                    <br />
                    ● To advisors, consultants, auditors, or similar
                    professionals to assess our business, financial, and legal
                    obligations or operations
                    <br />
                    ● If we believe it is necessary to protect the rights,
                    property, or safety of PAXIV or others
                    <br />
                    ● For any other purpose disclosed by us when you provide
                    Personal Information
                    <br />● With your consent, such as when you choose to
                    provide your information to third parties We may also
                    disclose de-identified information without restriction. Note
                    that if you make any Personal Information publicly available
                    on the Services, anyone may see and use such information.
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Service Providers
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV retains third party service providers to assist us in
                  our business. For example, we use service providers to assist
                  with analytics, email marketing, payment processing, customer
                  relationship management, and IT infrastructure and support.
                  PAXIV may permit these affiliates and service providers to
                  access your Personal Information in order to assist us in
                  providing services; however, we contractually require these
                  vendors to keepPersonal Information confidential and use it
                  only for the purposes for which we disclose it to them.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  California and Quebec, Canada Residents
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV shares Personal Information with the following
                  categories of third parties and has disclosed the following
                  categories of Personal Information for a business or
                  commercial purpose in the 12 months preceding the date this
                  Global Privacy notice was last modified:
                  <br />
                  <br />
                  <div className="flex items-center mx-auto justify-center w-full text-center border-t-[1px] border-gray-400 py-2">
                    <div className="w-1/2">Personal Information</div>
                    <div className="w-1/2">Third Parties</div>
                  </div>
                  <div className="flex items-center mx-auto justify-center w-full text-center border-t-[1px] border-gray-400 py-2">
                    <div className="w-1/2">Identifiers</div>
                    <div className="w-1/2">
                      Service providers, including data analytics and
                      advertising providers, operating systems and platforms,
                      social networks, other PAXIV customers
                    </div>
                  </div>
                  <div className="flex items-center mx-auto justify-center w-full text-center border-t-[1px] border-gray-400 py-2">
                    <div className="w-1/2">
                      Categories of personal information described in California
                      Civil Code §1798.80(e)
                    </div>
                    <div className="w-1/2">
                      Service providers, other PAXIV customers
                    </div>
                  </div>
                  <div className="flex items-center mx-auto justify-center w-full text-center border-t-[1px] border-gray-400 py-2">
                    <div className="w-1/2">Commercial information</div>
                    <div className="w-1/2">
                      Affiliates, distribution partners, other PAXIV customers
                    </div>
                  </div>
                  <div className="flex items-center mx-auto justify-center w-full text-center border-t-[1px] border-gray-400 py-2">
                    <div className="w-1/2">
                      Internet or other electronic network activity information
                    </div>
                    <div className="w-1/2">
                      Service providers, including data analytics and
                      advertising providers
                    </div>
                  </div>
                  <div className="flex items-center mx-auto justify-center w-full text-center border-t-[1px] border-gray-400 py-2">
                    <div className="w-1/2">
                      Geolocation data (e.g., IP addresses)
                    </div>
                    <div className="w-1/2">Service providers</div>
                  </div>
                  <div className="flex items-center mx-auto justify-center w-full text-center border-t-[1px] border-gray-400 py-2">
                    <div className="w-1/2">
                      Professional or employment-related information
                    </div>
                    <div className="w-1/2">
                      Service providers, other PAXIV customers
                    </div>
                  </div>
                  <div className="flex items-center mx-auto justify-center w-full text-center border-t-[1px] border-gray-400 py-2">
                    <div className="w-1/2">Inferences</div>
                    <div className="w-1/2">
                      Service providers, including data analytics and
                      advertising providers
                    </div>
                  </div>
                  <div className="flex items-center mx-auto justify-center w-full text-center border-t-[1px] border-b-[1px] border-gray-400 py-2">
                    <div className="w-1/2">
                      Sensitive personal information, including biometric
                      information, precise geolocation, login credentials, and
                      the contents of messages sent through the Services
                    </div>
                    <div className="w-1/2">Service providers</div>
                  </div>
                  <br />
                  <br />
                  PAXIV may also sell/share certain Personal Information. In the
                  12 months preceding the date this Global Privacy Notice was
                  last modified, PAXIV sold:
                  <br />
                  <p className="px-6 pt-4">
                    ● Identifiers (e.g., IP address and other online
                    identifiers), Internet or other electronic network activity
                    information, and commercial information (e.g., purchasing
                    tendencies or records of products or services purchased or
                    considered) to advertising providers for the purpose of
                    advertising its Services
                    <br />● Identifiers (e.g., name, email address), categories
                    of personal information described in California Civil Code
                    §1798.80(e) (phone number), and professional information
                    (e.g., name, title, email address, business address) to
                    other PAXIV customers for the purpose of making business
                    contact information available through the Professional
                    Directory feature
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20" ref={fifthRef}>
                <h1 className="text-primary text-2xl sm:text-3xl kl:text-6xl font-semibold tracking-[6px] sm:tracking-[10px] kl:tracking-[15px] leading-8  sm:leading-10 kl:leading-[60px] pt-6 kl:pt-12 pb-4">
                  5. International Transfer of Personal Information
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV is a global business. We may transfer your Personal
                  Information to the United States, where we are headquartered,
                  and to other countries which may not have the same privacy
                  laws as the country in which you initially provided the
                  information, but we will protect your Personal Information in
                  accordance with this Global Privacy Notice, or as otherwise
                  disclosed to you.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  European Economic Area (EEA) and United Kingdom Residents
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  If you live in the EEA or the United Kingdom, we may transfer
                  Personal Information to countries for which adequacy decisions
                  have been issued, use contractual protections for the transfer
                  of Personal Information to third parties, such as an
                  intra-company agreement or the European Commission&apos;s
                  Standard Contractual Clauses or their equivalent under
                  applicable law.
                  <br />
                  <br />
                  You may Contact Us to obtain a copy of the safeguards we use
                  to transfer Personal Information outside of the EEA or the
                  United Kingdom.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Canadian Residents
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  We may use service providers located outside of Canada,
                  including, without limitation, in the United States of
                  America, to process Personal Information, and may transfer
                  your Personal Information to such service providers for this
                  purpose. When your Personal Information is processed outside
                  of Canada, it will be subject to the laws of the countries
                  where the information is processed and may be accessible to
                  law enforcement and national security authorities of those
                  countries in accordance with their laws.
                  <br />
                  <br />
                  You mayContact Us to obtain information about our policies and
                  practices regarding the use of service providers located
                  outside of Canada.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20" ref={sixthRef}>
                <h1 className="text-primary text-2xl sm:text-3xl kl:text-6xl font-semibold tracking-[6px] sm:tracking-[10px] kl:tracking-[15px] leading-8  sm:leading-10 kl:leading-[60px] pt-6 kl:pt-12 pb-4">
                  6. Security of Personal Information
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV implements security safeguards to protect your Personal
                  Information.
                  <br />
                  <br />
                  We take steps to secure Personal Information through
                  administrative, technical, and physical safeguardsdesigned to
                  protect against the risk of accidental, unlawful, or
                  unauthorized destruction, loss, alteration, access,
                  disclosure, or use. For example, we encrypt payment card
                  information in accordance with the Payment Card Industry Data
                  Security Standard (PCI DSS) and store sensitive information
                  such as biometric and geolocation data on PAXIV servers
                  located in the United States with access limited to authorized
                  PAXIV employees.
                  <br />
                  <br />
                  Unfortunately, we cannot guarantee the security of information
                  transmitted through the Internet, and where we have given you
                  (or where you have chosen) a password, you are responsible for
                  keeping this password confidential.
                  <br />
                  <br />
                  PAXIV has designated a Cybersecurity Team to investigate and
                  respond to all security issues and vulnerabilities regarding
                  its offerings. You can contact this team at:&nbsp;
                  <a
                    className="font-semibold text-blue-500"
                    href="mailto:PAXIVSecurity1@PAXIV.com"
                  >
                    PAXIVSecurity1@PAXIV.com
                  </a>
                  .
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20" ref={seventhRef}>
                <h1 className="text-primary text-2xl sm:text-3xl kl:text-6xl font-semibold tracking-[6px] sm:tracking-[10px] kl:tracking-[15px] leading-8  sm:leading-10 kl:leading-[60px] pt-6 kl:pt-12 pb-4">
                  7. Retention of Personal Information
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  PAXIV will retain your information only for as long as is
                  reasonably necessary for the purposes set out on this Global
                  Privacy Notice, for as long as your account isactive (i.e.,
                  for the lifetime of your PAXIV customer account), or as needed
                  to provide the Services to you. If you no longer want PAXIV to
                  use your information to provide the Services to you, you may
                  close your account. PAXIV will retain and use your information
                  to the extent necessary to comply with our legal obligations,
                  resolve disputes, enforce our agreements, and as otherwise
                  described in this Global Privacy Notice. Please note that
                  closing an account may not make your email address, username,
                  or property name (if any) available for reuse on a new
                  account. We also retain log files for internal analysis
                  purposes. These log files are retained for a brief period of
                  time, except in cases where they are used to protect the
                  safety and security of the Services, to maintain and improve
                  functionality of the Services, or to comply with legal
                  obligations.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20" ref={eighthRef}>
                <h1 className="text-primary text-2xl sm:text-3xl kl:text-6xl font-semibold tracking-[6px] sm:tracking-[10px] kl:tracking-[15px] leading-8  sm:leading-10 kl:leading-[60px] pt-6 kl:pt-12 pb-4">
                  8. Manage Your Personal Information
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  You may manage your Personal Information by making certain
                  choices. If you believe that any Personal Information you have
                  provided to us is out-of-date or inaccurate, you may review
                  and correct such information ifit is within your online
                  account by logging in at any time or Contact Us. You may also
                  have additional rights detailed below depending on where you
                  live. As a security precaution, we may need to request
                  information from you to help us confirm your identity when
                  exercising a right related to your Personal Information.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Direct Marketing Opt-Out
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  If you no longer wish to receive direct marketing emails from
                  PAXIV, you may click the “Unsubscribe” link in an email at any
                  time. Depending on the Services, you may also be able to
                  manage notification preferences in your account. Note that
                  PAXIV may still contact you about the Terms of Use, Global
                  Privacy Notice, or other legal notices, or in connection with
                  providing you Services you have requested from us.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Tracking/Online Advertising Opt-Out
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  You may disable or delete browser cookies through your browser
                  settings. Cookies are generally easy to disable or delete, but
                  the method varies between browsers. To learnhow you can manage
                  Flash cookies, visit
                  <span className="text-blue-400">
                    &nbsp;Adobe&apos;s Flash player settings page
                  </span>
                  &nbsp; . Flash player settings page. If you disable or delete
                  cookies, or if you are running third-party software that
                  intercepts or deletes cookies, please note that some parts of
                  our websites may not work properly. You can opt out of third
                  parties collecting your Personal Information for targeted
                  advertising purposes in the United States or Canada by
                  visiting the National Advertising Initiative&apos;s
                  (NAI)&nbsp;
                  <span className="text-blue-400">&nbsp;opt-out page</span> and
                  the Digital Advertising Alliance&apos;s (DAA)&nbsp;
                  <span className="text-blue-400">&nbsp;opt-out page</span> and
                  in the EEA and United Kingdom by visiting The
                  Programme&apos;s&nbsp;
                  <span className="text-blue-400">&nbsp;opt-out page</span>. Our
                  Services do not recognize&nbsp;
                  <span className="font-semibold">&nbsp;Do Not Track</span>
                  &nbsp; signals.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  California Residents
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  If you live in California, you have the right to:
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    (1) request that PAXIV disclose what Personal Information we
                    collect, use, disclose, and sell;
                    <br />
                    (2) request deletion of Personal Information, subject to
                    certain exceptions;
                    <br />
                    (3) request that PAXIV correct inaccurate or incomplete
                    Personal Information;
                    <br />
                    (4) opt-out of the sale of Personal Information;
                    <br />
                    (5) opt-out of the “sharing” or disclosing Personal
                    Information for the purposes of cross-context behavioral
                    advertising, and
                    <br />
                    (6) not receive discriminatory treatment by PAXIV for
                    exercising these rights.
                    <br />
                  </p>
                  <br />
                  Requests to Know You have the right to request that we
                  disclose the following information:
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    ● Specific pieces of Personal Information PAXIV has
                    collected about you;
                    <br />
                    ● Categories of Personal Information PAXIV has collected
                    about you, disclosed about you for a business purpose, or
                    sold;
                    <br />
                    ● Categories of sources from which the Personal Information
                    is collected;
                    <br />
                    ● Categories of third parties with whom PAXIV shares or to
                    whom PAXIV sells Personal Information; and
                    <br />● The business or commercial purpose for collecting
                    and selling and sharing Personal Information.
                  </p>
                  <br />
                  Opt-Out of the Sale or Sharing of Personal Information
                  <br />
                  <br />
                  You have the right to opt-out of the sale of your Personal
                  Information. To make such a request, please Contact Usby email
                  or visit Do Not Sell my Personal Information [hyperlink]. To
                  opt-out of PAXIV sharing your Personal Information with third
                  parties to advertise our Services, please additionally manage
                  Tracking/Online Advertising Opt-Out [hyperlink] privacy
                  controls.
                  <br />
                  <br />
                  Please click here [hyperlink]for statistics relating to
                  California Consumer Privacy Act requests received by PAXIV
                  brands under this Global Privacy Notice in the prior calendar
                  year.
                  <br />
                  <br />
                  We do not have actual knowledge that we sell or share the
                  Personal Information of consumers under the age of 16. We do
                  not use or disclose sensitive personal information for
                  purposes other than those specified in Cal. Civ Code §
                  1798.121.
                  <br />
                  <br />
                  Exercising Your Rights
                  <br />
                  <br />
                  To make a request, please Contact Us by email, call us
                  toll-free at (407) 242-4321, or submit the request through
                  your PAXIV account or our rights request web form [hyperlink].
                  In order to verify your request, PAXIV mayrequire you to
                  provide additional information to confirm the identity of the
                  consumer.
                  <br />
                  <br />
                  Only you, or someone legally authorized to act on your behalf,
                  may make a verifiable consumer request related to your
                  Personal Information. To make a request on your behalf, an
                  authorized agent may Contact Us by email with proof of your
                  written and signed permission to do so. Note that PAXIV may
                  also require you to verify your identity and confirm that you
                  gave permission.
                  <br />
                  <br />
                  <span className="font-semibold">Shine the Light</span> Request
                  <br />
                  <br />
                  California residents may also have the right to request
                  certain information regarding our disclosure of Personal
                  Information to third parties for their direct marketing
                  purposes. To make such a request, please Contact Us.
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Nevada Residents
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  Nevada residents may have the right to opt-out of the sale of
                  Personal Information we have collected or will collect. To
                  make such a request, please Contact Us.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Virginia Residents
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  If you live in Virginia, you have the right to:
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    (1) request that PAXIV disclose and provide a copy of what
                    Personal Information we collect, use, disclose, and sell;
                    <br />
                    (2) request deletion of Personal Information, subject to
                    certain exceptions;
                    <br />
                    (3) request that PAXIV correct inaccurate or incomplete
                    Personal Information;
                    <br />
                    (4) opt-out of the sale of Personal Information;
                    <br />
                    (5) opt-out of targeted advertising;
                    <br />
                    (6) opt out of profiling in furtherance of decisions that
                    produce legal or similarly significant effects about you,
                    and
                    <br />
                    (7) not receive discriminatory treatment by PAXIV for
                    exercising these rights. To make a request, or to appeal our
                    decision regarding a previous request, please Contact Us by
                    email, call us toll-free at (407) 242-4321, or submit the
                    request through your PAXIV account or our rights request web
                    form [hyperlink]. If you are appealing our decision, please
                    submit your appeal by email referencing and/or attaching
                    information to identify your original request. In order to
                    verify your request, PAXIV may require you to
                    provideadditional information to confirm the identity of the
                    consumer.
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  European Economic Area (EEA) and United Kingdom Residents
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  If you live in the EEA or the United Kingdom, you may have the
                  right to
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    (1) request access to, rectification, or erasure of your
                    Personal Information or restrict the processing of your
                    Personal Information;
                    <br />
                    (2) object to processing;
                    <br />
                    (3) data portability
                    <br />
                    (receive and transfer your Personal Information);
                    <br />
                    (4) lodge a complaint with a supervisory authority; and,
                    <br />
                    (5) where processing of your Personal Information is based
                    on consent, withdraw your consent at any time without
                    affecting the lawfulness of the processing of Personal
                    Information that occurred before you withdraw consent. To
                    make such a request, please Contact Us.
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20">
                <h1 className="text-xl sm:text-2xl kl:text-5xl font-bold">
                  Canadian Residents
                </h1>
                <div className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  If you live in Canada, in addition to the other rights you may
                  have hereunder, you may have the right to
                  <br />
                  <p className="px-4 sm:px-8 py-4">
                    (1)request access to, review and to correct inaccuracies or
                    omissions in your Personal Information;
                    <br />
                    (2) to withdraw consent for collection, use or disclosure
                    of, or to request deletion of, your Personal Information
                    <br />
                    (provided that, if you do so, we may no longer be able to
                    provide services to you that rely on such Personal
                    Information);
                    <br />
                    (3) to ask questions about our policies and practices, and
                    to lodge complaints about our compliance with them with us
                    or with regulatory authorities; and
                    <br />
                    (4) for Quebec residents, to request an electronic copy of
                    the Personal Information you have provided to us in a
                    structured and commonly used technological format.
                  </p>
                  To make such a request, please Contact Us. We may require you
                  to provide additional information to confirm your identity
                  prior to carrying out any such request.
                </div>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20" ref={ninethRef}>
                <h1 className="text-primary text-2xl sm:text-3xl kl:text-6xl font-semibold tracking-[6px] sm:tracking-[10px] kl:tracking-[15px] leading-8  sm:leading-10 kl:leading-[60px] pt-6 kl:pt-12 pb-4">
                  9. Global Policy Changes
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  This Global Privacy Notice may be updated periodically to
                  reflect changes in our privacy practices.
                  <br />
                  <br />
                  We will post changes on this page and identify the date the
                  privacy notice was last revised at the top of the page.If we
                  make material changes to our privacy practices, we will notify
                  you through a notice on the home page of the websites covered
                  by this Global Privacy Notice. If a material change will apply
                  to Personal Information we have already collected, including
                  any new purposes for which the Personal Information will be
                  used or disclosed to which you have not previously consented,
                  we will additionally seek your affirmative consent.
                </p>
              </div>

              <div className="flex flex-col mt-10 kl:mt-20" ref={tenthRef}>
                <h1 className="text-primary text-2xl sm:text-3xl kl:text-6xl font-semibold tracking-[6px] sm:tracking-[10px] kl:tracking-[15px] leading-8  sm:leading-10 kl:leading-[60px] pt-6 kl:pt-12 pb-4">
                  10. Contact Us
                </h1>
                <p className="text-base sm:text-xl kl:text-4xl pt-4 kl:pt-8">
                  We have appointed a Privacy Officer and Data Protection
                  Officer to investigate and respond to privacy issues and to be
                  accountable for our compliance with this Global Privacy
                  Notice.
                  <br />
                  <br />
                  Please submit questions, concerns, or requests to exercise
                  your applicable rights to PAXIV by email to
                  <a
                    href="mailto:PAXIVPrivacy1@PAXIV.com"
                    className="font-semibold text-blue-500"
                  >
                    &nbsp;PAXIVPrivacy1@PAXIV.com.
                  </a>
                  <br />
                  <br />
                  You may also write to:
                  <br />
                  <br />
                  <span className="font-semibold">
                    PAXIV, LLC. 1840 N Technology Drive, Springville, Utah
                    84663-4965 Attn: Legal Department
                  </span>
                  <br />
                  <br />
                  If you live in the EEA or the United Kingdom, PAXIV UK Limited
                  is the entity responsible for the processing of your Personal
                  Information. Please submit questions, concerns, or requests to
                  exercise your applicable rights by email to
                  <a
                    href="mailto:PAXIVPrivacy1@PAXIV.com"
                    className="font-semibold text-blue-500"
                  >
                    &nbsp;PAXIVPrivacy1@PAXIV.com.
                  </a>
                  <br />
                  <br />
                  or write to:
                  <br />
                  <br />
                  <span className="font-semibold">
                    PAXIV, LLC. 1840 N Technology Drive, Springville, Utah
                    84663-4965 Attn: Legal Department
                  </span>
                  <br />
                  <br />
                  You may also make a complaint to your local data protection
                  authority.
                </p>
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

export default Privacy;
