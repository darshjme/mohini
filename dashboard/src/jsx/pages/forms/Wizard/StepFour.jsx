import { Link } from "react-router-dom";

function StepFour() {
   return (
      <section>
         <div className="row emial-setup">
            <div className="col-lg-3 col-sm-6 col-6">
               <div className="mb-3">
                  <label htmlFor="mailclient11" className="mailclinet mailclinet-gmail">
                     <input type="radio" name="emailclient" id="mailclient11" />
                     <span className="mail-icon">
                        <i className="mdi mdi-google-plus" aria-hidden="true" />
                     </span>
                     <span className="mail-text">I'm using Gmail</span>
                  </label>
               </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-6">
               <div className="mb-3">
                  <label htmlFor="mailclient12" className="mailclinet mailclinet-office">
                     <input type="radio" name="emailclient" id="mailclient12" />
                     <span className="mail-icon">
                        <i className="mdi mdi-office" aria-hidden="true" />
                     </span>
                     <span className="mail-text">I'm using Office</span>
                  </label>
               </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-6">
               <div className="mb-3">
                  <label htmlFor="mailclient13" className="mailclinet mailclinet-drive">
                     <input type="radio" name="emailclient" id="mailclient13" />
                     <span className="mail-icon">
                        <i className="mdi mdi-google-drive" aria-hidden="true" />
                     </span>
                     <span className="mail-text">I'm using Drive</span>
                  </label>
               </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-6">
               <div className="mb-3">
                  <label htmlFor="mailclient14" className="mailclinet mailclinet-another">
                     <input type="radio" name="emailclient" id="mailclient14" />
                     <span className="mail-icon">
                        <i className="fas fa-question-circle" />
                     </span>
                     <span className="mail-text">Another Service</span>
                  </label>
               </div>
            </div>
         </div>

         <div className="row">
            <div className="col-12">
               <div className="skip-email text-center">
                  <p>Or if want skip this step entirely and setup it later</p>
                  <Link to={"#"}>Skip step</Link>
               </div>
            </div>
         </div>
      </section>
   );
};

export default StepFour;
