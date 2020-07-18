import React from "react"
import Inline from "../src/components/common/inline"
import * as size from "../src/utils/size"

export default {
  title: 'Inline',
  component: Inline,
};

export function InlineXS() {
  return (
    <Wrapper>
      <Inline size={size.XS}>
        <Block />
        <Block />
        <Block />
      </Inline>
    </Wrapper>
  )
}

export function InlineS() {
  return (
    <Wrapper>
      <Inline size={size.S}>
        <Block />
        <Block />
        <Block />
      </Inline>
    </Wrapper>
  )
}

export function InlineM() {
  return (
    <Wrapper>
      <Inline size={size.M}>
        <Block />
        <Block />
        <Block />
      </Inline>
    </Wrapper>
  )
}

export function InlineL() {
  return (
    <Wrapper>
      <Inline size={size.L}>
        <Block />
        <Block />
        <Block />
      </Inline>
    </Wrapper>
  )
}

export function InlineXL() {
  return (
    <Wrapper>
      <Inline size={size.XL}>
        <Block />
        <Block />
        <Block />
      </Inline>
    </Wrapper>
  )
}

export function InlineComposed() {
  return (
    <Wrapper>
      <Inline size={size.XL}>
        <Block />
        <Block />
        <Inline size={size.M}>
          <Block />
          <Inline size={size.XS}>
            <Block />
            <Block />
          </Inline>
          <Block />
        </Inline>
        <Block />
        <Block />
      </Inline>
    </Wrapper>
  )
}

function Wrapper({ children }) {
  return (
    <div style={{ background: "black", borderBottom: "1px solid black" }}>
      {children}
    </div>
  )
}

function Block() {
  return (
    <div style={{ background: "red", width: "100px", height: "100px" }}></div>
  )
}
