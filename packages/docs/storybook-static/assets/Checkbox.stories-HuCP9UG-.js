import{j as e}from"./iframe-DMCBKBud.js";import{C as r}from"./index-BKNhb1Xp.js";import"./preload-helper-PPVm8Dsz.js";const k={title:"UI/Checkbox",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{checked:{control:"boolean"},indeterminate:{control:"boolean"},disabled:{control:"boolean"},muted:{control:"boolean"},ghost:{control:"boolean"},focused:{control:"boolean"},label:{control:"text"},description:{control:"text"}}},s={args:{label:"On, Normal",checked:!1}},a={args:{label:"On, Normal",checked:!0}},t={args:{label:"Mixed, Normal",indeterminate:!0}},o={args:{label:"Checkbox with description",description:"Helpful description of the setting which may briefly highlight side effects or conditions of the setting.",checked:!0}},c={args:{label:"On, Disabled + Muted",checked:!0,disabled:!0}},l={args:{label:"Off, Disabled + Muted",checked:!1,disabled:!0}},d={args:{label:"On, Normal, Muted",muted:!0,checked:!0}},n={args:{label:"Off, Normal + Muted",muted:!0,checked:!1}},i={args:{label:"On, Normal, Ghost",ghost:!0,checked:!0}},u={args:{label:"Off, Normal, Ghost",ghost:!0,checked:!1}},h={args:{label:"On, Focused",checked:!0,focused:!0}},m={args:{label:"Off, Focused + Muted",checked:!1,focused:!0}},b={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(r,{label:"On, Normal",checked:!0}),e.jsx(r,{label:"Off, Normal",checked:!1}),e.jsx(r,{label:"Mixed, Normal",indeterminate:!0}),e.jsx(r,{label:"On, Normal, Muted",checked:!0,muted:!0}),e.jsx(r,{label:"Off, Normal + Muted",muted:!0}),e.jsx(r,{label:"On, Normal, Ghost",checked:!0,ghost:!0}),e.jsx(r,{label:"Off, Normal, Ghost",ghost:!0}),e.jsx(r,{label:"On, Focused",checked:!0,focused:!0}),e.jsx(r,{label:"Off, Focused + Muted",focused:!0}),e.jsx(r,{label:"On, Disabled + Muted",checked:!0,disabled:!0}),e.jsx(r,{label:"Off, Disabled + Muted",disabled:!0}),e.jsx(r,{label:"With description",description:"Helpful description of the setting which may briefly highlight side effects or conditions of the setting.",checked:!0})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'On, Normal',
    checked: false
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'On, Normal',
    checked: true
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Mixed, Normal',
    indeterminate: true
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checkbox with description',
    description: 'Helpful description of the setting which may briefly highlight side effects or conditions of the setting.',
    checked: true
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'On, Disabled + Muted',
    checked: true,
    disabled: true
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Off, Disabled + Muted',
    checked: false,
    disabled: true
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'On, Normal, Muted',
    muted: true,
    checked: true
  }
}`,...d.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Off, Normal + Muted',
    muted: true,
    checked: false
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'On, Normal, Ghost',
    ghost: true,
    checked: true
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Off, Normal, Ghost',
    ghost: true,
    checked: false
  }
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'On, Focused',
    checked: true,
    focused: true
  }
}`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Off, Focused + Muted',
    checked: false,
    focused: true
  }
}`,...m.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Checkbox label="On, Normal" checked />
      <Checkbox label="Off, Normal" checked={false} />
      <Checkbox label="Mixed, Normal" indeterminate />
      <Checkbox label="On, Normal, Muted" checked muted />
      <Checkbox label="Off, Normal + Muted" muted />
      <Checkbox label="On, Normal, Ghost" checked ghost />
      <Checkbox label="Off, Normal, Ghost" ghost />
      <Checkbox label="On, Focused" checked focused />
      <Checkbox label="Off, Focused + Muted" focused />
      <Checkbox label="On, Disabled + Muted" checked disabled />
      <Checkbox label="Off, Disabled + Muted" disabled />
      <Checkbox label="With description" description="Helpful description of the setting which may briefly highlight side effects or conditions of the setting." checked />
    </div>
}`,...b.parameters?.docs?.source}}};const x=["Default","Checked","Indeterminate","WithDescription","Disabled","DisabledUnchecked","Muted","MutedUnchecked","Ghost","GhostUnchecked","Focused","FocusedUnchecked","AllStates"];export{b as AllStates,a as Checked,s as Default,c as Disabled,l as DisabledUnchecked,h as Focused,m as FocusedUnchecked,i as Ghost,u as GhostUnchecked,t as Indeterminate,d as Muted,n as MutedUnchecked,o as WithDescription,x as __namedExportsOrder,k as default};
