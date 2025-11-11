import{j as r}from"./iframe-DMCBKBud.js";import{B as e}from"./index-BKNhb1Xp.js";import"./preload-helper-PPVm8Dsz.js";const m={title:"UI/Button",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","tertiary","danger"]},size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"}}},a={args:{children:"Primary Button",variant:"primary"}},t={args:{children:"Secondary Button",variant:"secondary"}},s={args:{children:"Tertiary Button",variant:"tertiary"}},n={args:{children:"Danger Button",variant:"danger"}},i={render:()=>r.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:[r.jsx(e,{size:"sm",children:"SM"}),r.jsx(e,{size:"md",children:"MD"}),r.jsx(e,{size:"lg",children:"LG"})]})},o={render:()=>r.jsxs("div",{style:{display:"flex",gap:"12px"},children:[r.jsx(e,{variant:"primary",disabled:!0,children:"Primary Disabled"}),r.jsx(e,{variant:"secondary",disabled:!0,children:"Secondary Disabled"}),r.jsx(e,{variant:"tertiary",disabled:!0,children:"Tertiary Disabled"}),r.jsx(e,{variant:"danger",disabled:!0,children:"Danger Disabled"})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Danger Button',
    variant: 'danger'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  }}>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
    </div>
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px'
  }}>
      <Button variant="primary" disabled>Primary Disabled</Button>
      <Button variant="secondary" disabled>Secondary Disabled</Button>
      <Button variant="tertiary" disabled>Tertiary Disabled</Button>
      <Button variant="danger" disabled>Danger Disabled</Button>
    </div>
}`,...o.parameters?.docs?.source}}};const p=["Primary","Secondary","Tertiary","Danger","Sizes","Disabled"];export{n as Danger,o as Disabled,a as Primary,t as Secondary,i as Sizes,s as Tertiary,p as __namedExportsOrder,m as default};
