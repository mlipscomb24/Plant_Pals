#!/bin/bash

# Create root directory structure
mkdir -p client/public client/src/{components/{Auth,Dashboard,Plants,Gamification,Layout},pages,utils} server/{config,models,schemas,utils,services}

# Create client-side files
touch client/public/{index.html,manifest.json}
touch client/src/components/Auth/{Login.jsx,Signup.jsx}
touch client/src/components/Dashboard/Dashboard.jsx
touch client/src/components/Plants/{PlantList.jsx,PlantItem.jsx,AddPlantForm.jsx,PlantSearch.jsx}
touch client/src/components/Gamification/Badges.jsx
touch client/src/components/Layout/{Header.jsx,Footer.jsx}
touch client/src/pages/{Home.jsx,Profile.jsx,Plantcare.jsx}
touch client/src/utils/{auth.js,queries.js,api.js}
touch client/src/{App.jsx,index.js}
touch client/{package.json,README.md}

# Create server-side files
touch server/config/connection.js
touch server/models/{User.js,Plant.js,Badge.js}
touch server/schemas/{typeDefs.js,resolvers.js}
touch server/utils/auth.js
touch server/services/plantApiService.js
touch server/{server.js,package.json,.env}

# Create root package.json and README.md
touch package.json README.md

echo "MERN stack project structure created successfully!"