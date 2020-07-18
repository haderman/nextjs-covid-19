import React from "react"
import Stack from "../src/components/common/stack"
import * as size from "../src/utils/size"

export default {
  title: 'Stack',
  component: Stack,
};

export function StackXS() {
  return (
    <Wrapper>
      <Stack size={size.XS}>
        <Block />
        <Block />
        <Block />
      </Stack>
    </Wrapper>
  )
}

export function StackS() {
  return (
    <Wrapper>
      <Stack size={size.S}>
        <Block />
        <Block />
        <Block />
      </Stack>
    </Wrapper>
  )
}

export function StackM() {
  return (
    <Wrapper>
      <Stack size={size.M}>
        <Block />
        <Block />
        <Block />
      </Stack>
    </Wrapper>
  )
}

export function StackL() {
  return (
    <Wrapper>
      <Stack size={size.L}>
        <Block />
        <Block />
        <Block />
      </Stack>
    </Wrapper>
  )
}

export function StackXL() {
  return (
    <Wrapper>
      <Stack size={size.XL}>
        <Block />
        <Block />
        <Block />
      </Stack>
    </Wrapper>
  )
}

export function StackComposed() {
  return (
    <Wrapper>
      <Stack size={size.XL}>
        <Block />
        <Block />
        <Stack size={size.M}>
          <Block />
          <Stack size={size.XS}>
            <Block />
            <Block />
          </Stack>
          <Block />
        </Stack>
        <Block />
        <Block />
      </Stack>
    </Wrapper>
  )
}

function Wrapper({ children }) {
  return (
    <div style={{ background: "black", borderBottom: "1px solid black", width: 400 }}>
      {children}
    </div>
  )
}

function Block() {
  return (
    <div style={{ background: "red", height: "100px", widht: 400 }}></div>
  )
}
