import { sacraments } from "../../constants/sacraments";

export default function Services() {
  return (
    <>
      {/*<!-- Start service --> */}
      <section className="services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>7 Sacraments in the catholic church</h2>
                <img src="img/section-img.png" alt="#" />
                <p>
                  Each sacrament is an outward sign of an inward grace. When we
                  participate in them worthily, each provides us with
                  graces—with the life of God in our soul. In worship, we give
                  to God that which we owe Him; in the sacraments, He gives us
                  the graces necessary
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {sacraments?.map((sacrament: any) => (
              <div className="col-lg-3 col-md-6 col-12">
                {/*<!-- Start Single Service --> */}
                <div className="single-service">
                  <h4>
                    <a href="service-details.html">{sacrament?.name}</a>
                  </h4>
                  <p>{sacrament?.description}</p>
                </div>
                {/*<!-- End Single Service --> */}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*<!--/ End service --> */}
    </>
  );
}
