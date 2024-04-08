import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import { useAuth } from "../auth/AuthProvider";
import * as userSelector from "../../store/selectors/user";
import cssClasses from "./Home.module.css";
import { useEffect } from "react";
import {HOME} from "../../helpers/home/home";

function Home() {
  const { signOut, getUserDetails, isLoading } = useAuth();
  const name = useSelector(userSelector.userName);

  const signOutUser = async () => {
    signOut();
  };

  useEffect(
    () => {
      getUserDetails();
    }, // eslint-disable-next-line
    []
  );

  if (isLoading) {
    return (
        <section>
          <h2> Loading.... </h2>
        </section>
    )
  }

  return (
      <div className={cssClasses.homeWrapper}>
      <section>
        <h2>{HOME.WELCOME_MESSAGE} </h2>
        <h2>{`Hi  ${name}`} </h2>
        <p className={cssClasses.paragraphWrapper}>
          <br />
          <Button
            onClick={signOutUser}
            variant="success"
            className={cssClasses.buttonWrapper}
          >
            SignOut
          </Button>
        </p>
      </section>
    </div>
  );
}

export default Home;
