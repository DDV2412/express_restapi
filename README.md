# Kel 2 - Ecommerce Web API

Binar Kel 2 Node.js based eCommerce platform. Allows creating Web API.

Built with:

- Node.js v16.15.1
- Express
- PostgreSQL

### Requirements

- Node.js >= 16
- PostgreSQL >= 14

## Documentation

[Documentation](https://github.com/DDV2412/platinum_challenge/tree/master/docs/docs.json)

## Product Backlogs

[Pembagian_Task](https://sharing.clickup.com/36851279/b/h/134kjf-62/fda30a935ff1060)

## Kriteria Penilaian

```
- Menerapkan design pattern Model-Controller-Router (1 point). ✅
- Authentication dan Authorization memanfaatkan JSON Web Token (1 point). ✅
- Terdapat API untuk mengunggah berkas atau media (1.5 point). ✅
- Terdapat fungsi mengirim email menggunakan Nodemailer (1.5 point). ✅
- Terdapat fungsi chat menggunakan Socket.io (1.5 point). ✅
- Membuat unit test dengan modul Jest (2 point). ✅
- Menerapkan CI/CD (1 point). ✅
- Dokumentasi API dibuat menggunakan Swagger (0.5 point). ✅

```

## Application Structure

```
.
├── __tests__                # Unit test
├── config                   # Project and build configurations
├── controller               # Project controller
├── database                 # Project Database
├── docs                     # Api Documentation JSON
├── helpers                   # Script helpers
├── libs                      # Script Library
├── logs                     # Log files
├── middleware               # Middleware
├── mocks                    # Mocks data
├── models                   # Database models
├── repository               # Repository
├── routes                   # Routes
├── Use Case                 # Use case
├── .sequelizerc             # Sequelize config
├── app.js                   # Express Application
├── package.json             # Library file
├── validation               # Validation input controll
├── server.js                # Server application start point
├── swagger.js               # Auto generate api docs
```

## Team

```
.
├── Team Leader
│   ├── Dian Dwi Vaputra
│
├── Project Manager
│   ├── Rangga
│
├── Developers
│   ├── Dian Dwi Vaputra
│   ├── Rais
│   ├── Yuan Levai Leo
│
├── QA
│   ├── Yuan Levai Leo
```

## ERD (Entity Relationship Diagram)

![ERD](https://github.com/DDV2412/platinum_challenge/blob/master/E-Commerce.png?raw=true)

## Licence

This software is provided free of charge and without restriction under the MIT License
