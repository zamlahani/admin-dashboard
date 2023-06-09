import React, { ReactNode } from "react";
import PropTypes from "prop-types";

import { Col, Row } from "antd";

const DoubleGrid = (props: {
  container: {
    gutter: number;
    className: string;
    style: object;
  };
  leftComponent: {
    component: ReactNode;
    justify?: string;
    className?: string;
    style?: object;
    span: number;
  };
  rightComponent: {
    component: ReactNode;
    justify?: string;
    className?: string;
    style?: object;
    span: number;
  };
}) => {
  const { container, leftComponent, rightComponent } = props;

  return (
    <Row gutter={container.gutter} style={container.style} className={container.className}>
      <Col
        span={leftComponent.span === undefined ? 12 : leftComponent.span}
        style={leftComponent.style}
        className={`${leftComponent.justify === undefined ? "left" : leftComponent.justify} ${
          leftComponent.className === undefined ? "" : leftComponent.className
        }`}
      >
        {leftComponent.component}
      </Col>
      <Col
        span={rightComponent.span === undefined ? 12 : rightComponent.span}
        style={rightComponent.style}
        className={`${rightComponent.justify === undefined ? "right" : rightComponent.justify} ${
          rightComponent.className === undefined ? "" : rightComponent.className
        }`}
      >
        {rightComponent.component}
      </Col>
    </Row>
  );
};

DoubleGrid.defaultProps = {
  container: {
    gutter: 20,
  },
};

export default DoubleGrid;
