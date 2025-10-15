# Safe Wallet

**Safe Wallet** is a secure, user-friendly application designed to help users **manage finances** efficiently. The project focuses on **security**, **simplicity**, and **intuitive design**, providing a reliable tool for personal finance management.

---
## Features 

---
###### NIY = Not Implemented Yet
---

- **Login**
    - Username (Done)
    - Password (Done)
    - Login with google (NIY)
    - Try biometrical login (NIY)

- **Home** 
    - Welcome message for the user (Done)

- **Informations Page**
    - Describe all features (Done)

- **Graphics**
    - Expenses chart (NIY)
    - Expected savings chart (NIY)scha

- **Add / Remove Depenses**
    - Add expenses (NIY)
    - Modify expenses (NIY)
    - Delete expenses (NIY)

- **Monthly Cards**
    - Create a card for each month to display expenses (NIY)
    - Try automatic generation of expense cards(NIY)

- **Yearly Summary**
    - Automaticaly generate a sumary of the year (NIY)

- **Compare depenses** 
    - Compare monthly depenses (planned future)

- **DangerZone**
    - Maybe in future...

---

## What I Learned

### Setup Simulator

1. #### Install Xcode ####
   First, I installed **Xcode** and set up the **iOS version** by going to the settings and pressing `⌘ + ,`
   
2. #### Install Watchman ####  
   Watchman is a tool for monitoring file changes, which improves performance.  
   Installation command:  
   ```bash
   brew install watchman
3. #### Launching app ####
    Then running the application with `npx expo start` and opening the ***ios simulator (i)*** 
---
### Setup Welcome page

1. #### Image Background ####
    First i choosed a image for my background, then i put it using `<ImageBackground source={HomeImage}`, HomeImage refers to a const that i created for redirecting the image `const HomeImage = require("../assets/images/rome.jpg")`
2. #### Image Background cover error ####
    I had a problem with the image, the size didn't cover all the phone, so i found a very useful code to resolve that
    `...StyleSheet.absoluteFillObject`, the command zooms the image to completly cover the phone.
3. #### Redirecting button to login page ####
    To do that, i start by importing userRouter `import { useRouter } from "expo-router";` then i create a onPress function,
    `onPress={() => router.push("/screens/login")}` so when i click the button it redirects me to /screens/login.
4. #### Styling the button ####
    I found some really cool css styles, like shadowColor, that is for ios and android.
    - IOS
        - shadowColor (shadow color)
        - shadowOffset (move x & y)
        - shadowOpacity (shadow opacity)
        - shadowRadius (blur)
    - Android
        - elevation (the bigger the number,bigger the shadow )
--- 
### Setup firebase 

1. #### Setup FireBaseConfig.ts
    First of all, after doing `npx expo install firebase` i created a file **fireBaseConfig.ts** and i put all the informations that firebase gived to me after i created the web app on firebase.
    Then i imported firebase auth and firebase store. and exported like the app, so i can use **FIREBASE_AUTH** when i want, and dont need to import all the times.
2. #### Metro.config.js
    It's a advanced configuration file for react native, it's for particulary needs.

---
### Login
1. #### UseState ####
    First i create 4 const which contain `const [password, setPassword] = useState('');`, and for email and reloading aswell
2. #### TextInput ####
    I created a textInput and i use `value={email} value={password}` and onChangeText it set a new value to the const
    I put `secureTextEntry={true}` then i have "*****" when i wrote my password
3. #### Logic ####
    When i click on button "login" it goes to the signIn logic, it will take the email and password and see inside firebase all the persons that i have, if password or email dont match, a alert will be showed, il its ok it will send the person to home page with the **signInWithEmailAndPassword** firebase feature

    Basically same thing with signUp but instead of just create, it will verify first if a email with that name is already registrateed, i didn't do that, firebase does alone
4. #### Get Username to use on Home page ####
    I used **updateprofile** from firebase to put a username on the account, so when the person register for the first time,the app asks "what is your name" then is saved into the person profile.
    Then, on home page i import **FIREBASE auth** and create a user const `const user = FIREBASE_AUTH.currentUser`
    And displayed on a Text, using `Salut {user?.displayName}`, why ? beacause maybe the person didn't put a name on it

---
### Tabs
1. #### Imports ####
    First i started by importing `import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";` into the page that i want to get the tabs
2. #### Tab Navigation ####
    Then i created a `<Tab.Navigator>` and inside i put `<Tab.screen name="nameOfTab" component={nameOfTab}>`, then i imported the tabs.

---
### Change Tabs Icon

#### 1. Imports
First, I imported `Ionicons` from `'@expo/vector-icons'`. This allows me to use icons in my tab navigator.

#### 2. TabNavigator
Then, I declare a tab navigator using `createBottomTabNavigator()`.  

- If the route name is `'exemple'`, a specific icon is displayed.  
- If the route name is something else, a different icon is displayed.  

I also use `tabBarActiveTintColor` and `tabBarInactiveTintColor` to adjust the icon colors when a tab is active or inactive.

---
### Firebase DB

#### 1. Imports
First i imported `import { doc, getDoc, setDoc } from "firebase/firestore"`, which gives me the utilities to manage the database.
#### 2. useState
I created `currentId, userData, and loading` loading is a boolean, set to true by default.
#### 3. useEffect
The first useEffect sets currentId with the user ID, verifying if the user is connected or not.
The second useEffect fetches the data. I use a try-catch block, and inside, I try to get the document with `doc(FIREBASE_DB, "users", currentid)`
and then getting the doc with `const docSnap = await getDoc(docRef);` then if `docSnap.exists` i get the data with a const `const data = docSnap.data();` and set the userData with the data else a error shows up, then i do the function on the end of the useEffect by doing `fetchData()`
#### 4. Display data
to display i use `Nom: {userData?.displayName ?? "Inconnu"}`if displayName does not exist it shows `Inconnu`
### Firebase Firestore Functionsa

- **`doc`**  
  Creates a reference to a specific document in a Firestore collection.  
  Example: `const docRef = doc(FIREBASE_DB, "users", userId);`

- **`getDoc`**  
  Retrieves the data from a document reference. Returns a snapshot of the document.  
  Example: `const docSnap = await getDoc(docRef);`

- **`setDoc`**  
  Writes data to a document. If the document does not exist, it will be created.  
  Example: `await setDoc(docRef, { name: "John", age: 30 });`
### UseFocusEffet

- **`What is usefocuseffect`**  
  Is a hook from react navigation, it executes the code when a screen becomes "active" (focus) and clean when screen is "inactive"
- **`What is useCallBack`**  
  Memorise a function so, react dont need to create every time, it executes only when is called.

### fetchDataExpenses

- **`function`**
    First, I use a try...catch block.
    Inside the try, I declare a constant expensesRef that points to the Firestore collection "users/{currentUid}/expenses".
    Then I use getDocs(expensesRef) to get all the documents in that collection and store the result in querySnapshot.
    Next, I create a data array by mapping through querySnapshot.docs.
    For each document, I return an object containing the document’s id and all its data using the spread operator (...doc.data()).
    Finally, I update the state with setExpensesData(data).

    If an error occurs, the catch block logs the error and sets an empty array with setExpensesData([]).

    The finally block sets setLoading(false) to stop the loading indicator.