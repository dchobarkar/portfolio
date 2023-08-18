import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import Fade from "react-reveal";

import Header from "./Header";
import FallbackSpinner from "./FallbackSpinner";
import endpoints from "../constants/endpoints";

const styles = {
  introContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
  },
  introTextContainer: {
    width: "80%",
    margin: 10,
    whiteSpace: "pre-wrap",
    textAlign: "left",
    fontSize: "1.2em",
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
};

function About(props) {
  const [data, setData] = useState(null);
  const { header } = props;

  const parseIntro = (text) => <ReactMarkdown children={text} />;

  useEffect(() => {
    fetch(endpoints.about, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />

      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <Row style={styles.introContainer}>
                <Col style={styles.introTextContainer}>
                  {parseIntro(data.about)}
                </Col>

                <Col style={styles.introImageContainer}>
                  <img src={data?.imageSource} width="50%" alt="profile" />
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
