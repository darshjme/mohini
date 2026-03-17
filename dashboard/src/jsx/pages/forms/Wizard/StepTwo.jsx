function StepTwo() {
   return (
      <section>
         <div className="row">
            <div className="col-lg-6 mb-2">
               <div className="mb-3">
                  <label className="text-label form-label required">Company Name  </label>
                  <input type="text" name="firstName" className="form-control" placeholder="Cellophane Square" required />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="mb-3">
                  <label className="text-label form-label required">Company Email Address </label>
                  <input type="email" className="form-control" id="emial1" placeholder="example@example.com.com" required />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="mb-3">
                  <label className="text-label form-label required">Company Phone Number </label>
                  <input type="number" name="phoneNumber" className="form-control" placeholder="(+1)408-657-9007" required />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="mb-3">
                  <label className="text-label form-label required">Your position in Company </label>
                  <input type="text" name="place" className="form-control" required />
               </div>
            </div>
         </div>
      </section>
   );
};

export default StepTwo;
