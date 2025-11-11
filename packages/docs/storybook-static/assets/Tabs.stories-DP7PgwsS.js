import{j as a,R as d}from"./iframe-DMCBKBud.js";import{a as e}from"./index-BKNhb1Xp.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"UI/Tabs",component:e,parameters:{layout:"centered"},tags:["autodocs"]},r={render:()=>a.jsx(e,{items:[{label:"Active Tab"},{label:"Second tab"}],defaultValue:0})},t={render:()=>a.jsx(e,{items:[{label:"Active tab"},{label:"Second tab"},{label:"Third tab"}],defaultValue:0})},s={render:()=>a.jsx(e,{items:[{label:"Active Tab"},{label:"Second tab"},{label:"Third tab"},{label:"Fourth tab"}],defaultValue:0})},l={render:()=>a.jsx(e,{items:[{label:"Active Tab",badge:"21"},{label:"Second tab"},{label:"Third tab",badge:"5"}],defaultValue:0})},n={render:()=>a.jsx(e,{items:[{label:"Single Tab Title"}],defaultValue:0})},o={render:()=>{const[b,c]=d.useState(0);return a.jsx(e,{items:[{label:"First tab"},{label:"Second tab"},{label:"Third tab"}],value:b,onChange:c})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs items={[{
    label: 'Active Tab'
  }, {
    label: 'Second tab'
  }]} defaultValue={0} />
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs items={[{
    label: 'Active tab'
  }, {
    label: 'Second tab'
  }, {
    label: 'Third tab'
  }]} defaultValue={0} />
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs items={[{
    label: 'Active Tab'
  }, {
    label: 'Second tab'
  }, {
    label: 'Third tab'
  }, {
    label: 'Fourth tab'
  }]} defaultValue={0} />
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs items={[{
    label: 'Active Tab',
    badge: '21'
  }, {
    label: 'Second tab'
  }, {
    label: 'Third tab',
    badge: '5'
  }]} defaultValue={0} />
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs items={[{
    label: 'Single Tab Title'
  }]} defaultValue={0} />
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = React.useState(0);
    return <Tabs items={[{
      label: 'First tab'
    }, {
      label: 'Second tab'
    }, {
      label: 'Third tab'
    }]} value={value} onChange={setValue} />;
  }
}`,...o.parameters?.docs?.source}}};const T=["Default","Three","Four","WithBadges","Single","Interactive"];export{r as Default,s as Four,o as Interactive,n as Single,t as Three,l as WithBadges,T as __namedExportsOrder,p as default};
