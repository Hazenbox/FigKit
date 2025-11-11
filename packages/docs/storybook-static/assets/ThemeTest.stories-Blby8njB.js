import{j as e}from"./iframe-DMCBKBud.js";import"./preload-helper-PPVm8Dsz.js";const l={title:"Utilities/ThemeTest",parameters:{layout:"centered"}},t={render:()=>{if(typeof document>"u")return e.jsx("div",{children:"Server-side rendering"});const r=document.documentElement.getAttribute("data-brand")||"not set",d=document.documentElement.getAttribute("data-theme")||"not set",n=getComputedStyle(document.documentElement).getPropertyValue("--color-bg-default").trim(),o=getComputedStyle(document.documentElement).getPropertyValue("--color-text-default").trim();return e.jsxs("div",{style:{padding:"20px",fontFamily:"monospace"},children:[e.jsx("h3",{children:"Theme Debug Info"}),e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{children:[e.jsx("strong",{children:"data-brand:"})," ",r]}),e.jsxs("div",{children:[e.jsx("strong",{children:"data-theme:"})," ",d]}),e.jsxs("div",{children:[e.jsx("strong",{children:"--color-bg-default:"})," ",n||"not found"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"--color-text-default:"})," ",o||"not found"]})]}),e.jsxs("div",{style:{marginTop:"20px",padding:"16px",backgroundColor:n||"#fff",color:o||"#000",border:"1px solid #ccc",borderRadius:"8px"},children:[e.jsx("p",{children:"This box should change color when you switch themes."}),e.jsxs("p",{children:["Background: ",n]}),e.jsxs("p",{children:["Text: ",o]})]})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    if (typeof document === 'undefined') {
      return <div>Server-side rendering</div>;
    }
    const brand = document.documentElement.getAttribute('data-brand') || 'not set';
    const theme = document.documentElement.getAttribute('data-theme') || 'not set';
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-bg-default').trim();
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text-default').trim();
    return <div style={{
      padding: '20px',
      fontFamily: 'monospace'
    }}>
        <h3>Theme Debug Info</h3>
        <div style={{
        marginTop: '16px'
      }}>
          <div><strong>data-brand:</strong> {brand}</div>
          <div><strong>data-theme:</strong> {theme}</div>
          <div><strong>--color-bg-default:</strong> {bgColor || 'not found'}</div>
          <div><strong>--color-text-default:</strong> {textColor || 'not found'}</div>
        </div>
        <div style={{
        marginTop: '20px',
        padding: '16px',
        backgroundColor: bgColor || '#fff',
        color: textColor || '#000',
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}>
          <p>This box should change color when you switch themes.</p>
          <p>Background: {bgColor}</p>
          <p>Text: {textColor}</p>
        </div>
      </div>;
  }
}`,...t.parameters?.docs?.source}}};const c=["ThemeDebug"];export{t as ThemeDebug,c as __namedExportsOrder,l as default};
