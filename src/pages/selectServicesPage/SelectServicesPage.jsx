import { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "../../components/Navbar";
import hairCutImage from "../../assets/images/hair_cut.jpg";
import beardStyleImage from "../../assets/images/beard_styling.jpg";
import facialImage from "../../assets/images/facial.jpg";
import massageImage from "../../assets/images/massage.jpg";
import groomPackageImage from "../../assets/images/groom.jpeg";
import hairStylingImage from "../../assets/images/hair_styling.jpg";
import cartIcon from "../../assets/icons/cart-icon-b.png"
import { formatePrice } from "../../shared/utils";
import { FacialServices } from "../../shared/barberServices/FacialServices";
import { BeardServices } from "../../shared/barberServices/BeardServices";
import { GroomServices } from "../../shared/barberServices/GroomServices";
import { HairServices } from "../../shared/barberServices/HairServices";
import { HairStylingServices } from "../../shared/barberServices/HairStylingServices";
import { MassageServices } from "../../shared/barberServices/MassageServices";
import { CartDialog } from "../../components/CartDialog";

import "./selectServicesPage.css";

export const SelectServicesPage = () => {
  const location = useLocation();
  const { u_info, appointmentTime, selectedBarber} = location.state;
  if (!u_info || !appointmentTime || !selectedBarber) {
    window.location.href = "/";
  }
  const [openServicesDialog, setOpenServicesDialog] = useState(false);
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const [openedServices, setOpenedServices] = useState([]);
  const [openedServiceName, setOpenedServiceName] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (service, action) => {
    if (action === "checked") {
      setTotalPrice(totalPrice + service.s_price);
    } else if(action === "unchecked") {
      setTotalPrice(totalPrice - service.s_price);
    }
  };

  const SelectServicesDialog = ({serviceType, openedServiceName}) => {
    return (
      <div className="services__dialog">
      <h3 className="services__dialog-title">Select {openedServiceName} Services</h3>
      <div className="services__dialog__container">
        {
          serviceType.map((service) => {
            const {s_id, s_name, s_price} = service;
            return (
              <div className="services__dialog__container__option" key={s_id}>
                <div className="services__info">
                  <input type="checkbox" name={s_name} value={s_name}
                    checked={selectedServices.some((selectedService) => selectedService.s_id === s_id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedServices([...selectedServices, service]);
                        calculateTotalPrice(service, "checked");
                      } else {
                        setSelectedServices(selectedServices.filter((s) => s.s_id !== service.s_id));
                        calculateTotalPrice(service, "unchecked");
                      }
                    }}
                  />
                  <label style={{marginLeft: "1rem"}} htmlFor={s_id}>{s_name}</label><br/>
                </div>
                <span>Rs. {formatePrice(s_price)}</span>
              </div>
            )
          })
        }
      </div>
      <div className="services__dialog__button__container">
        <button style={{backgroundColor:"red"}}
          onClick={() => {
            setOpenServicesDialog(!openServicesDialog);
            setOpenedServices([]);
            setOpenedServiceName("");
          }}
          className="services__dialog__button">Close</button>
        <button className={`services__dialog__button ${selectedServices.length === 0 ? "disable-btn" : ""}`}
          onClick={() => {
            setOpenServicesDialog(!openServicesDialog);
            setOpenedServices([]);
            setOpenedServiceName("");
          }}
        >Add to Cart</button>
      </div>
    </div>
    )
  };

  return (
    <>
      <NavBar u_info={u_info}/>
      <div className="services__page"
        style={{
          filter: (openServicesDialog || openCartDialog) ? "blur(6px)" : "none",
          pointerEvents: (openServicesDialog || openCartDialog) ? "none" : "auto"
        }}
      >
        <div className="services__page__top">
          <div className="appointment__details__container">
            <h3>Appointment Details</h3>
            <h4>Selected Time: <span>{appointmentTime}</span></h4>
            <h4>Barber Shop Name: <span>{selectedBarber.b_shop_name}</span></h4>
            <h4>Barber Shop Location: <span>{selectedBarber.b_city}</span></h4>
          </div>
          <div className="cart__container">
            <button className={`cart__button ${selectedServices.length === 0 ? "disable-btn" : ""}`}
              onClick={()=>{
                setOpenCartDialog(!openCartDialog);
              }}
            >
              <img src={cartIcon} alt="cart-icon" />
              <span>View Cart</span>
            </button>
          </div>
        </div>
        <div className="services__list">
          <div className="services__list__card">
            <img src={hairCutImage} alt="haircut"/>
            <h4 className="services__image_title"
              onClick={() => {
                setOpenedServices(HairServices);
                setOpenedServiceName("Hair Cut");
                setOpenServicesDialog(!openServicesDialog);
              }}
            >Hair Cut</h4>
          </div>
          <div className="services__list__card">
            <img src={beardStyleImage} alt="beard"/>
            <h4 className="services__image_title"
              onClick={() => {
                setOpenedServices(BeardServices);
                setOpenedServiceName("Beard Styling");
                setOpenServicesDialog(!openServicesDialog);
              }}
            >Beard Style</h4>
          </div>
          <div className="services__list__card">
            <img src={facialImage} alt="facial"/>
            <h4 className="services__image_title"
              onClick={() => {
                setOpenedServices(FacialServices);
                setOpenedServiceName("Facial");
                setOpenServicesDialog(!openServicesDialog);
              }}
            >Facial</h4>
          </div>
          <div className="services__list__card">
            <img src={massageImage} alt="massage"/>
            <h4 className="services__image_title"
              onClick={() => {
                setOpenedServices(MassageServices);
                setOpenedServiceName("Massage");
                setOpenServicesDialog(!openServicesDialog);
              }}
            >Massage</h4>
          </div>
          <div className="services__list__card">
            <img src={groomPackageImage} alt="groom"/>
            <h4 className="services__image_title"
              onClick={() => {
                setOpenedServices(GroomServices);
                setOpenedServiceName("Groom Package");
                setOpenServicesDialog(!openServicesDialog);
              }}
            >Groom Package</h4>
          </div>
          <div className="services__list__card">
            <img src={hairStylingImage} alt="hairstyling"/>
            <h4 className="services__image_title"
              onClick={() => {
                setOpenedServices(HairStylingServices);
                setOpenedServiceName("Hair Styling");
                setOpenServicesDialog(!openServicesDialog);
              }}
            >Hair Styling</h4>
          </div>
        </div>
      </div>
      {
        openServicesDialog && (
          <SelectServicesDialog 
            serviceType={openedServices} 
            openedServiceName={openedServiceName}
          />
        )
      }
      {
        openCartDialog && (
          <CartDialog
            selectedServices={selectedServices}
            totalPrice={totalPrice}
            openCartDialog={openCartDialog}
            setOpenCartDialog={setOpenCartDialog}
            u_info={u_info}
            appointmentTime={appointmentTime}
            selectedBarber={selectedBarber}
          />
        )
      }
    </>
  );
}
