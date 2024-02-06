# Stylo

Webshop project with CMS and MACH architecture. Built using React and Express. 🚀

![logo](https://github.com/CroAnna/Stylo/assets/90924342/0c978658-8e20-4f57-8151-a0a955515b01)


This was a team project and created by 5 students (including myself) and reviewed by <a href="https://ibmix.de/en/" target="_blank">IBM iX</a>. It was developed using agile methodology - Scrum and documented in Jira and Confluence.

<p align="center">

<p>Watch the video: 👇</p>

[<img src="https://img.youtube.com/vi/VIzjsMCsqaA/hqdefault.jpg"/>](https://youtu.be/VIzjsMCsqaA?si=7Xju6KpGcK5kkK07)

</p>


## Stylo documentation - table of contents

<ul>
  <li><a href="#devteam">Development team</a></li>
  <li><a href="#description">Project description and features</a></li>
  <li><a href="#technologies">Technologies</a></li>
  <li><a href="#mach">MACH Architecture in context of our project</a></li>
  <li><a href="#arch">Architecture and microservices</a></li>
  <li><a href="#ui">Stylo UI</a></li>
</ul>

<div id="devteam"></div>

## Development team

| Role | Github username  |  
|---|---|
| Frontend, UI design | @CroAnna  |   
| Frontend, UI design | @Fr1k1 |  
| Backend |  @jbudak20-foi  | 
| Backend |  @Robert4361 | 
| DevOps | @Filip1402   | 

<div id="description"></div>

## Project description and features


The Stylo application represents an E-commerce webshop designed to integrate Content Management System (CMS) and E-commerce systems, employing the MACH architecture. The software's core functionalities encompass roles for administrators, employees, and customers, with a current focus on footwear sales.

Employees have the capability to manage products, the categories to which specific products belong, review customer order data, and modify order statuses. Through the CMS, employees can edit, add, and delete web pages. For now, administrators are responsible for adding employees to the system.

Users, or customers in this context, should be able to browse categories and products within a specific category (with features such as filtering and sorting), view individual product displays containing price, image, availability, description, and name, make purchases through a shopping cart using card transactions, and receive invoices via email. Additionally, customers must have the ability to contact employees through a contact/customer support form.

Unregistered users should be able to register in the system. After registration, users receive an email to activate their accounts.

In terms of architecture, it must consist of microservices (resulting in a relatively large number of GitHub repositories) connecting to a single API gateway. The application aims to utilize existing CMS and E-commerce solutions, incorporating specific functionalities as needed (e.g., sending emails to users). The application is intended to be "cloud-agnostic," deployable on any cloud service, facilitated by Docker. The web component of the application must also be responsive.

<div id="technologies"></div>

## Technologies

### Frontend 🎭
- **React** - A  JavaScript library for building user interfaces
- **react-loader-spinner** - A lightweight spinner component for React applications
- **react-responsive-carousel** - A responsive carousel component for React applications
- **react-toastify** - A React notification library providing customizable toast messages
- **sweetalert2** - A customizable and responsive modal library for React applications
- **yup** - A schema validation library for JavaScript objects
- **emailjs** - A library for sending emails in JavaScript applications

### Backend 🕸️
- **NodeJS** - A server-side JavaScript runtime.
- **Express** - A minimal and flexible Node.js web application framework.
- **pdfkit** - A JavaScript library for generating PDF documents

### CMS ⚙️
- **Contentful** - A headless Content Management System (CMS) that allows you to manage and deliver digital content across various platforms.

### E-commerce 🛒
- **Commercetools** - A modern and flexible headless commerce platform, providing APIs for building scalable and customizable ecommerce solutions. It was used as database for all products and orders.

### Mail service ✉️
- **Nodemailer** - A powerful and easy-to-use Node.js module for sending emails, enabling seamless integration of email services in applications.

### Payment 💵
- **Stripe** -A payment processing platform, facilitating secure and efficient online transactions.

### DevOps 🐟
- **Docker** - Enables streamlined deployment by encapsulating microservices and the API gateway in portable containers, allowing for simultaneous and efficient start-up.

### API gateway 🛜
- **Kong** - An open-source API gateway that manages, secures, and scales API requests, providing a centralized point for controlling and monitoring API traffic.
The API gateway acts as a middleware connecting the frontend and backend. Its primary role is to route traffic to designated microservices, handling authentication and rate limitation to free up microservices for core business logic. Deployment in Docker and maintaining a dedicated repository are recommended practices.

<div id="mach"></div>

## MACH Architecture in context of our project

This architectural framework is built upon the foundation of multiple independent microservices.

The "M" in this context signifies microservices, highlighting the decentralized nature of the system.

The "A" represents the commitment to an API-first approach. This dictates that our application should be conceived with a focus on the APIs our services need to provide, as opposed to developing functionality first and subsequently creating APIs.

The "C" denotes Cloud native, emphasizing the need to leverage the full spectrum of benefits offered by cloud infrastructure. The goal is to design the application to operate seamlessly on any cloud, making it inherently Cloud Agnostic and independent of specific cloud provider technologies.

The "H" stands for "Headless".  Iteans decoupling the backend (microservices) from the frontend. It allows flexibility by separating the presentation layer, enabling various frontends to access the same backend services without being tied to a specific format.

<div id="arch"></div>

## Architecture and microservices

Application is composed of 2 parts:
<ul>
  <li> Web app frontend: the main UI of the app</li>
   <li> Backend: which contains 4 microservices</li>
</ul>

The backend comprises four interconnected microservices, facilitated by an API gateway such as Kong. The microservices include:
<ul>
  <li>    Products - integrates data from our headless Ecommerce and CMS APIs (products, product details, categories, webshop and homepage layout)</li>
  <li>    Receipts -  includes creation of PDF receipt which are meant to be sent to customers</li>
   <li>   Emails - used for sending mails to customers (account verfication, receiving a PDF invoice on email)</li>
   <li>   Customers - customer registration and login</li>
</ul>


Overall structure of the entire Stylo application:

![structure](https://github.com/CroAnna/Stylo/assets/90924342/379689d5-070c-41a6-bbcf-53a7bab82ac9)


Frontend component diagram:

![compo](https://github.com/CroAnna/Stylo/assets/90924342/bb14dbdc-0632-4362-927e-06c377aa6696)


<div id="ui"></div>

## Stylo UI

Designed in Figma. 
![homepage](https://github.com/CroAnna/Stylo/assets/90924342/ab4b58cd-923c-498b-b930-95e9c34aebef)
![product-details](https://github.com/CroAnna/Stylo/assets/90924342/8e3c8952-6b03-4606-adda-afd13172c957)
![product-list-default](https://github.com/CroAnna/Stylo/assets/90924342/ea74d593-6180-4a74-b50a-6ab4b4ee2ceb)
![login-desktop](https://github.com/CroAnna/Stylo/assets/90924342/56d31bc6-1504-40a5-9d6a-7516cc8f7889)
![shopping-cart](https://github.com/CroAnna/Stylo/assets/90924342/7391d69c-f340-4167-b9a9-5a6b7deae7cc)

View full <a href="https://www.figma.com/file/7BeMYsf9fGjBY9wMeaMKJD/AiR-projekt?type=design&node-id=0%3A1&mode=dev&t=3ZqX6vvANEHxYYxp-1">Figma file</a> here. Icons are from <a href="https://www.flaticon.com/">Flaticon</a> and <a href="https://phosphoricons.com/">Phosphor Icons</a>.

![slika](https://github.com/CroAnna/Stylo/assets/90924342/9197eb27-1a58-45f0-99ab-ba69a19ea04d)
