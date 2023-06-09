import React, { ReactNode } from "react";
import PropTypes from "prop-types";

import { Col, Row } from "antd";

const TripleGrid = (props: {
  container: {
    gutter?: number;
    className: string;
    style?: React.CSSProperties;
  };
  leftComponent: {
    component: ReactNode;
    justify?: string;
    className?: string;
    style?: React.CSSProperties;
    span: number;
  };
  centerComponent: {
    component: ReactNode;
    justify?: string;
    className?: string;
    style?: React.CSSProperties;
    span: number;
  };
  rightComponent: {
    component: ReactNode;
    justify?: string;
    className?: string;
    style?: React.CSSProperties;
    span: number;
  };
}) => {
  const { container, leftComponent, centerComponent, rightComponent } = props;

  return (
    <Row gutter={container.gutter} style={container.style} className={container.className}>
      <Col
        span={leftComponent.span === undefined ? 8 : leftComponent.span}
        style={leftComponent.style}
        className={`${leftComponent.justify === undefined ? "left" : leftComponent.justify} ${
          leftComponent.className === undefined ? "" : leftComponent.className
        }`}
      >
        {leftComponent.component}
      </Col>
      <Col
        span={centerComponent.span === undefined ? 8 : centerComponent.span}
        style={centerComponent.style}
        className={`${centerComponent.justify === undefined ? "center" : centerComponent.justify} ${
          centerComponent.className === undefined ? "" : centerComponent.className
        }`}
      >
        {centerComponent.component}
      </Col>
      <Col
        span={rightComponent.span === undefined ? 8 : rightComponent.span}
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

TripleGrid.defaultProps = {
  container: {
    gutter: 20,
  },
};

export default TripleGrid;
