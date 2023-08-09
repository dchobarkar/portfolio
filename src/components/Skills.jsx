import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import Fade from "react-reveal";
import { Container } from "react-bootstrap";

import Header from "./Header";
import FallbackSpinner from "./FallbackSpinner";
import endpoints from "../constants/endpoints";

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
  },
  introTextContainer: {
    whiteSpace: "pre-wrap",
  },
};

function Skills(props) {
  const [data, setData] = useState(null);
  const { header } = props;

  useEffect(() => {
    fetch(endpoints.skills, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown children={intro} />
    </h4>
  );

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              {renderSkillsIntro(data.intro)}
              {data.skills?.map((rows) => (
                <div key={rows.title}>
                  <br />

                  <h3>{rows.title}</h3>

                  {rows.items.map((item) => (
                    <div key={item.title} style={{ display: "inline-block" }}>
                      <img
                        style={styles.iconStyle}
                        src={item.icon}
                        alt={item.title}
                      />

                      <p>{item.title}</p>
                    </div>
                  ))}
                </div>
              ))}
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
