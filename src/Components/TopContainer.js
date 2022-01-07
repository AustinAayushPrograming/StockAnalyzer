import {
    Button,
    CircularProgress,
    FilledInput,
    FormControl,
    InputAdornment,
    InputLabel,
} from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";

function TopContainer({ ticker, handleSubmit, loading }) {
    return (
        <Row className="divContainer">
            <Col md={6}>
                <span>Stock Analyzer</span>
            </Col>
            <Col md={6}>
                <div className="inputSide">
                    <FormControl
                        sx={{ flexDirection: "row", height: "60px" }}
                        variant="filled"
                    >
                        <InputLabel htmlFor="filled-adornment-amount">
                            Ticker
                        </InputLabel>
                        <FilledInput
                            sx={{
                                width: "200px",
                                borderTopRightRadius: "0px",
                                borderBottomRightRadius: "0px",
                                outline: "none",
                            }}
                            inputRef={ticker}
                            id="outlined-adornment-amount"
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }
                            onChange={(e) => {
                                ticker.current.value = e.target.value;
                            }}
                        />
                        <Button
                            sx={{
                                width: "100px",
                                height: "60px",
                                borderTopLeftRadius: "0px",
                                borderBottomLeftRadius: "0px",
                            }}
                            variant="outlined"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </div>
                {loading ? <CircularProgress /> : null}
            </Col>
        </Row>
    );
}

export default TopContainer;
