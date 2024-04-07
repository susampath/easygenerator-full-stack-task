import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import { useAuth } from "../auth/AuthProvider";
import * as userSelector from "../../store/selectors/user";
import cssClasses from "./Home.module.css";
import { useEffect } from "react";

function Home() {
  const { signOut, getUserDetails, isLoading } = useAuth();
  const userName = useSelector(userSelector.userName);

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
    return "Loading.....";
  }

  return (
    <div className={cssClasses.homeWrapper}>
      <section>
        <h2> {` Welcome :  ${userName}`}</h2>
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
