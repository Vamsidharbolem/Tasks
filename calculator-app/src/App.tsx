import React, { useState } from "react";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const CalculatorContainer = styled(Paper)({
  maxWidth: 320,
  margin: "50px auto",
  padding: 20,
  textAlign: "center",
  borderRadius: 10,
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
});

const Display = styled(Typography)({
  minHeight: "50px",
  backgroundColor: "#f5f5f5",
  textAlign: "right",
  padding: "10px",
  fontSize: "24px",
  borderRadius: "5px",
  marginBottom: "10px",
});

const ButtonStyled = styled(Button)({
  width: "60px",
  height: "60px",
  fontSize: "20px",
  margin: "5px",
});

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        setExpression(eval(expression).toString()); // ⚠ Use with caution (Replace with safer eval method)
      } catch {
        setExpression("Error");
      }
    } else if (value === "C") {
      setExpression("");
    } else if (value === "√") {
      setExpression(`Math.sqrt(${expression})`);
    } else if (value === "∛") {
      setExpression(`Math.cbrt(${expression})`);
    } else if (value === "MOD") {
      setExpression(expression + "%");
    } else {
      setExpression(expression + value);
    }
  };

  const handleUndo = () => {
    setExpression(expression.slice(0, -1)); // Remove the last character from the expression
  };

  return (
    <Container>
      <CalculatorContainer>
        <Display>{expression || "0"}</Display>

        <Grid container spacing={1} justifyContent="center">
          {/* Row 1 - Numbers and basic operators */}
          {["7", "8", "9", "/"].map((item) => (
            <Grid item key={item}>
              <ButtonStyled variant="contained" onClick={() => handleButtonClick(item)}>
                {item}
              </ButtonStyled>
            </Grid>
          ))}

          {/* Row 2 - Numbers and basic operators */}
          {["4", "5", "6", "*"].map((item) => (
            <Grid item key={item}>
              <ButtonStyled variant="contained" onClick={() => handleButtonClick(item)}>
                {item}
              </ButtonStyled>
            </Grid>
          ))}

          {/* Row 3 - Numbers and basic operators */}
          {["1", "2", "3", "-"].map((item) => (
            <Grid item key={item}>
              <ButtonStyled variant="contained" onClick={() => handleButtonClick(item)}>
                {item}
              </ButtonStyled>
            </Grid>
          ))}

          {/* Row 4 - Numbers and basic operators */}
          {["0", ".", "C", "+"].map((item) => (
            <Grid item key={item}>
              <ButtonStyled variant="contained" color={item === "C" ? "error" : "primary"} onClick={() => handleButtonClick(item)}>
                {item}
              </ButtonStyled>
            </Grid>
          ))}

          {/* Equals button (last button on the row) */}
          <Grid item xs={12}>
            <ButtonStyled variant="contained" color="success" fullWidth onClick={() => handleButtonClick("=")}>
              =
            </ButtonStyled>
          </Grid>

          {/* Expression operation buttons */}
          <Grid item xs={6}>
            <ButtonStyled variant="contained" color="primary" fullWidth onClick={() => handleButtonClick("√")}>
              √
            </ButtonStyled>
          </Grid>
          <Grid item xs={6}>
            <ButtonStyled variant="contained" color="primary" fullWidth onClick={() => handleButtonClick("∛")}>
              ∛
            </ButtonStyled>
          </Grid>
          <Grid item xs={6}>
            <ButtonStyled variant="contained" color="primary" fullWidth onClick={() => handleButtonClick("MOD")}>
              MOD
            </ButtonStyled>
          </Grid>
          
          {/* Undo button */}
          <Grid item xs={6}>
            <ButtonStyled variant="contained" color="secondary" fullWidth onClick={handleUndo}>
              Undo
            </ButtonStyled>
          </Grid>
        </Grid>
      </CalculatorContainer>
    </Container>
  );
};

export default Calculator;
