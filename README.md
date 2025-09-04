# Safe Wallet

**Safe Wallet** is a secure, user-friendly application designed to help users **manage finances** efficiently. The project focuses on **security**, **simplicity**, and **intuitive design**, providing a reliable tool for personal finance management.

---
## Features 

---
###### NIY = Not Implemented Yet
---

- **Login**
    - Username (NIY)
    - Password (NIY)
    - Login with google (NIY)
    - Try biometrical login (NIY)

- **Home** 
    - Welcome message for the user (NIY)

- **Graphics**
    - Expenses chart (NIY)
    - Expected savings chart (NIY)

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

    