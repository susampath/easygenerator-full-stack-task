import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import cssClasses from "./NotFoundPage.module.css";

function NotFoundPage() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div>
      <section className={cssClasses.section}>
        <h1 className={cssClasses.error}>Page Not Found</h1>
        <br />
        <p className={cssClasses.error}>
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="flexGrow">
          <Button onClick={goBack} variant="warning">
            Go Back
          </Button>
        </div>
      </section>
    </div>
  );
}
export default NotFoundPage;
