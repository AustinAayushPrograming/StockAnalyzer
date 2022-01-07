import {
    FilledInput,
    FormControl,
    InputAdornment,
    InputLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { Col, Row } from "react-bootstrap";

function TopContainer({ ticker, handleSubmit, loading }) {
    return (
        <Row className="divContainer">
            <Col md={6}>
                <span className="title-font">Stock Analyzer</span>
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
                                borderTopLeftRadius: "5px",
                                borderBottomLeftRadius: "5px",
                                outline: "none",
                            }}
                            disableUnderline
                            inputRef={ticker}
                            id="outlined-adornment-amount"
                            onChange={(e) => {
                                ticker.current.value = e.target.value;
                            }}
                        />
                        <LoadingButton
                            disableElevation
                            variant="text"
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Submit
                        </LoadingButton>
                    </FormControl>
                </div>
            </Col>
        </Row>
    );
}

export default TopContainer;
