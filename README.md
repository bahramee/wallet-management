  <p>
    <a href="">
        <img width="200" src="" alt="" />
    </a>
  </p>
  <h1>🚀 Welcome to Wallet Management System 🌟</h1>
</div>

## Introduction 👋

Welcome to the Wallet Management System! This project aims to provide a robust and scalable solution for managing user wallets and transactions using NestJS microservices and Mongoose for MongoDB integration.

### Features 🎯

- **Wallet Management**:
  - **Deposit Funds**: Add funds to user wallets.
  - **View Wallet**: Retrieve wallet details.
  
- **Transaction Logging**:
  - **Track Deposits**: Record all deposit transactions with unique reference IDs.
  
- **Daily Totals Calculation**:
  - **Calculate and Log**: Automatically calculate and log daily transaction totals.

- **Scheduled Tasks**:
  - **Daily Totals**: Automatically logs daily transaction totals at midnight.

## Get Started 🚀

### Prerequisites ✨

- **Docker**: To run the application in a containerized environment.
- **Git**: For version control.

### Local Setup 🌐

Clone the project and set up the environment:

```bash
git clone https://github.com/bahramee/wallet-management.git
cd wallet-management
docker compose up
```

Once the setup is complete, you can access:
- **API Documentation**: [Swagger](http://127.0.0.1:4000)

### Running Tests 🧪

To ensure the application is working as expected, run the tests using:

```bash
cd apps/api
npm run test
```

Please note that if your local MongoDB is running on port 27017, you should first stop your local MongoDB and then run 
```
docker compose up
```