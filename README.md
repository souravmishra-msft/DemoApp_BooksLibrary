## Before you Run this sample:

This sample makes uses of MongoDB atlas, which is a cloud database service. To setup MongoDB Atlas, refer to the following [documentation]('https://www.mongodb.com/docs/atlas/getting-started/') for more details. Once MongoDB Atlas setup is done, let's follow the steps listed below to get the project ready to run.

- **Step 1:** Clone this repository 
    ```
    git clone https://github.com/souravmishra-msft/AAD-DemoApp-BookLibrary.git
    ```
- **Step 2:** Navigate inside the directory where you can find the project files.
    ```
    cd AAD-DemoApp-BookLibrary
    ```
- **Step 3:** Open the project in `VS-Code`. Once you have the project opened in VS-Code, open a `New Terminal` (CTRL + SHIFT + `)  inside VSCode and make sure you are in the right directory where the projects are available.

- **Step 4:** Install all the npm packages required for this project to run.
    ```
    npm install
    ```
    ### Note: Once the above command completes, you should see a node_modules directory available now inside your main project directory.

- **Step 5:** Create a `main.env` file inside the `config` directory and add the following details:
    ```
    PORT = <Define a PORT here on which the server will be listening to>
    DB_CONNECT = mongodb+srv://<mongoDBAtlas-admin-username>:<admin-password>@cluster0.bxvly.mongodb.net/<DB_Name>?retryWrites=true&w=majority
    ```
- **Step 6:** Once done with updating the contents of the `main.env` file, in the terminal, run the following command to run this project.
    ```
    npm run start-dev
    ```