import{j as e}from"./iframe-DMCBKBud.js";import{T as s}from"./index-BKNhb1Xp.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"UI/Tab",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{selected:{control:"boolean"},badge:{control:"text"},state:{control:"select",options:["Default","Focused","Hover"]},children:{control:"text"}}},a={args:{children:"Tab Title",selected:!1}},t={args:{children:"Active Tab",selected:!0}},r={args:{children:"Tab Title",selected:!0,badge:"21"}},l={args:{children:"Tab Title",selected:!1,state:"Hover"}},c={args:{children:"Tab Title",selected:!0,state:"Focused"}},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{style:{display:"flex",gap:"0"},children:[e.jsx(s,{selected:!1,children:"Unselected"}),e.jsx(s,{selected:!0,children:"Selected"})]}),e.jsxs("div",{style:{display:"flex",gap:"0"},children:[e.jsx(s,{selected:!1,state:"Hover",children:"Hover"}),e.jsx(s,{selected:!0,state:"Focused",children:"Focused"})]}),e.jsxs("div",{style:{display:"flex",gap:"0"},children:[e.jsx(s,{selected:!0,badge:"21",children:"With Badge"}),e.jsx(s,{selected:!1,children:"No Badge"})]})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Tab Title',
    selected: false
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Active Tab',
    selected: true
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Tab Title',
    selected: true,
    badge: '21'
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Tab Title',
    selected: false,
    state: 'Hover'
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Tab Title',
    selected: true,
    state: 'Focused'
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <div style={{
      display: 'flex',
      gap: '0'
    }}>
        <Tab selected={false}>Unselected</Tab>
        <Tab selected={true}>Selected</Tab>
      </div>
      <div style={{
      display: 'flex',
      gap: '0'
    }}>
        <Tab selected={false} state="Hover">Hover</Tab>
        <Tab selected={true} state="Focused">Focused</Tab>
      </div>
      <div style={{
      display: 'flex',
      gap: '0'
    }}>
        <Tab selected={true} badge="21">With Badge</Tab>
        <Tab selected={false}>No Badge</Tab>
      </div>
    </div>
}`,...d.parameters?.docs?.source}}};const u=["Default","Selected","WithBadge","Hover","Focused","AllStates"];export{d as AllStates,a as Default,c as Focused,l as Hover,t as Selected,r as WithBadge,u as __namedExportsOrder,p as default};
