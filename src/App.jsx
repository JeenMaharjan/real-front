import { BrowserRouter as Router, Route, Switch , useLocation  } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from './component/ScrollToTop//ScrollToTop.jsx';
import Home from "./component/Home/Home.jsx";
import Footer from "./component/Footer/Footer.jsx"
import Headers from "./component/Header/Header.jsx"
import PropertyDisplay from "./component/PropertyDisplay/PropertyDisplay.jsx"
import PageNotfound from "./component/PageNotfound/PageNotfound.jsx"
import AboutUs from "./component/AboutUs/AboutUs.jsx"
import PropertyList from "./component/PropertyList/PropertyList.jsx"
import EMICalculator from "./component/EMICalculator/EMICalculator.jsx"
import AreaConverter from "./component/AreaConverter/AreaConverter.jsx"
import Mapdand from "./component/Mapdand/Mapdand.jsx"
import Canvas from "./component/Canvas/Canvas.jsx"
import Demo from "./component/Demo/Demo.jsx"
import MapdandArea from "./component/Mapdand/MapdandArea.jsx"
import ContactPage from "./component/ContactPage/ContactPage.jsx"
import Dashboard from "./component/Dashboard/Dashboard.jsx";
import PropertyUpdate from "./component/PropertyUpdate/PropertyUpdate.jsx";
import PropertySingleUpdate from "./component/PropertySingleUpdate/PropertySingleUpdate.jsx";
import MapdandUpdate from "./component/MapdandUpdate/MapdandUpdate.jsx";
import MapdandUpload from "./component/MapdandUpload/MapdandUpload.jsx";
import ChangePassword from "./component/ChangePassword/ChangePassword.jsx";
import Admin from "./component/Admin/Admin.jsx";
import SendMessage from "./component/SendMessage/SendMessage.jsx";


import { ReactLenis } from '@studio-freight/react-lenis';
const lenisOptions = {
  lerp: 0.07, // Increase this value for smoother and slower scrolling
  smooth: true,
  direction: 'vertical'
};

function Layout() {
  const location = useLocation(); // Hook to get the current location
  const showHeaderAndFooter = !(
   
    location.pathname === "/changepassword" ||
    location.pathname === "/admin" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/viewproject" ||
    location.pathname.startsWith("/dashboard/")
  );
  

  return (
    <ReactLenis root={true} autoRaf={true} options={lenisOptions}>
       {showHeaderAndFooter  && <Headers />}
       
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/property/:slug" component={PropertyDisplay} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/property-list" component={PropertyList} />
        <Route exact path="/emi-calculator" component={EMICalculator} />
        <Route exact path="/मापदण्ड" component={Mapdand} />
        <Route exact path="/demo" component={Demo} />
        <Route exact path="/area-converter" component={AreaConverter} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/dashboard/property-update" component={PropertyUpdate} />
        <Route exact path="/dashboard/property-update/:slug" component={PropertySingleUpdate} />
        <Route exact path="/dashboard/mapdand-upload" component={MapdandUpdate} />
        <Route exact path="/dashboard/mapdand-update" component={MapdandUpload} />
        <Route exact path="/tst-admin" component={Admin} />
        <Route exact path="/sendmessage" component={SendMessage} />
        <Route exact path="/changepassword" component={ChangePassword} />
        {/* <Route exact path="/MapdandArea" component={MapdandArea} /> */}
        <Route exact path="/dashboard" component={Dashboard} />
         <Route component={PageNotfound} />
      </Switch>
      <Footer />
    </ReactLenis>
  );
}

function App() {
  const [loadingg, setloadingg] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setloadingg(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer position="top-center" />
     <Layout />
    </Router>
  );
}

export default App;
