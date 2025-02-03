import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar"; // Only one import here
import Dashboard from "./scenes/dashboard";
import ListUser from "./components/Formulaire/users/ListUser";
import ListClient from "./components/clients/ListClient";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";

import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Reunion from "./components/Formulaire/reunions/reunion";
import Login from "./components/auth/login";
import Visite from "./components/Formulaire/visites/visite";
import Profile from "./components/auth/profile";
import Tache from "./components/Formulaire/taches/tache";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useNavigate } from "react-router-dom";
import Index from "./components/Formulaire/users";
import AddClient from "./components/clients/addClient";
import IndexActiviteClient from "./components/ActiviteClient/indexActiviteClient";
import indexSecteur from "./components/secteur/indexSecteur";
import ListBanque from "./components/Formulaire/banque/ListBanque";
import ListReunion from "./components/Formulaire/reunions/ListReunion";
import AddBanque from "./components/Formulaire/banque/addBanque";
import Update from "./components/Formulaire/users/update";
import ListTache from "./components/Formulaire/taches/ListTache";
import UpdateClient from "./components/clients/updateClient";
import ListVisite from "./components/Formulaire/visites/ListVisite";
import ListSecteur from "./components/secteur/ListSecteur";
import AddSecteur from "./components/secteur/addSecteur";
import UpdateReunion from "./components/Formulaire/reunions/updateReunion";
import ListRegion from "./components/region/ListRegion";
import AddRegion from "./components/region/addRegion";
import UpdateTache from "./components/Formulaire/taches/updateTache";
import AddGouvernement from "./components/gouvernement/addGouvernement";
import ListGouvernement from "./components/gouvernement/ListGouvernement";
import ListRues from "./components/Formulaire/rue/ListeRue";
import addRue from "./components/Formulaire/rue/addrue";
import addliv from "./components/Formulaire/Livraison/addliv";
import listliv from "./components/Formulaire/Livraison/ListeLiv";
import UpdateVisite from "./components/Formulaire/visites/updateVisite";
import AddActiviteClient from "./components/ActiviteClient/addActiviteClient";
import ListActiviteClient from "./components/ActiviteClient/ListActiviteClient";
import CalendarVisite from "./scenes/calendar/calendarVisite";
import calendarTache from "./scenes/calendar/calendarTache";
import ListeBonDeCommande from './components/Formulaire/BonDeCommande/ListeBonDeCommande';
import ArticleForm from './components/Formulaire/BonDeCommande/ArticleForm';
import ClientForm from './components/Formulaire/BonDeCommande/ClientForm';


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isAuthenticated && (
              <Topbar setIsSidebar={setIsSidebar} handleLogout={handleLogout} />
            )}
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute
                    component={Dashboard}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route path="/bon-de-commande/liste" element={<ListeBonDeCommande />} />
              <Route path="/article-form" element={<ArticleForm/>} />
              <Route path="/client-form" element={<ClientForm/>} />
              <Route
                path="/ListUser"
                element={
                  <PrivateRoute
                    component={ListUser}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/addUser"
                element={
                  <PrivateRoute
                    component={Index}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/users/update/:id"
                element={
                  <PrivateRoute
                    component={Update}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/addClient"
                element={
                  <PrivateRoute
                    component={AddClient}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListClient"
                element={
                  <PrivateRoute
                    component={ListClient}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/clients/updateClient/:id"
                element={
                  <PrivateRoute
                    component={UpdateClient}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListReunion"
                element={
                  <PrivateRoute
                    component={ListReunion}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/reunions/updateReunion/:id"
                element={
                  <PrivateRoute
                    component={UpdateReunion}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/taches/updateTache/:id"
                element={
                  <PrivateRoute
                    component={UpdateTache}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/visites/UpdateVisite/:id"
                element={
                  <PrivateRoute
                    component={UpdateVisite}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute
                    component={Contacts}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/invoices"
                element={
                  <PrivateRoute
                    component={Invoices}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/reunion"
                element={
                  <PrivateRoute
                    component={Reunion}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/tache"
                element={
                  <PrivateRoute
                    component={Tache}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/visite"
                element={
                  <PrivateRoute
                    component={Visite}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/faq"
                element={
                  <PrivateRoute
                    component={FAQ}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/calendar"
                element={
                  <PrivateRoute
                    component={Calendar}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/CalendarTache"
                element={
                  <PrivateRoute
                    component={calendarTache}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/CalendarVisite"
                element={
                  <PrivateRoute
                    component={CalendarVisite}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute
                    component={Profile}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/secteur"
                element={
                  <PrivateRoute
                    component={indexSecteur}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/activite"
                element={
                  <PrivateRoute
                    component={IndexActiviteClient}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListBanque"
                element={
                  <PrivateRoute
                    component={ListBanque}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListSecteur"
                element={
                  <PrivateRoute
                    component={ListSecteur}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/AddBanque"
                element={
                  <PrivateRoute
                    component={AddBanque}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/AddRegion"
                element={
                  <PrivateRoute
                    component={AddRegion}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/Addliv"
                element={
                  <PrivateRoute
                    component={addliv}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListLiv"
                element={
                  <PrivateRoute
                    component={listliv}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListeRues"
                element={
                  <PrivateRoute
                    component={ListRues}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/AddRue"
                element={
                  <PrivateRoute
                    component={addRue}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListRegion"
                element={
                  <PrivateRoute
                    component={ListRegion}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/AddActiviteClient"
                element={
                  <PrivateRoute
                    component={AddActiviteClient}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListActiviteClient"
                element={
                  <PrivateRoute
                    component={ListActiviteClient}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/AddGouvernement"
                element={
                  <PrivateRoute
                    component={AddGouvernement}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListGouvernement"
                element={
                  <PrivateRoute
                    component={ListGouvernement}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/AddSecteur"
                element={
                  <PrivateRoute
                    component={AddSecteur}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListTache"
                element={
                  <PrivateRoute
                    component={ListTache}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/Tache"
                element={
                  <PrivateRoute
                    component={Tache}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/ListVisite"
                element={
                  <PrivateRoute
                    component={ListVisite}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
