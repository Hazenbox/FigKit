import React, {type ReactNode} from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import type DocBreadcrumbsType from '@theme/DocBreadcrumbs';
import type {WrapperProps} from '@docusaurus/types';
import PageActions from '@site/src/components/PageActions';

type Props = WrapperProps<typeof DocBreadcrumbsType>;

export default function DocBreadcrumbsWrapper(props: Props): ReactNode {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      width: '100%',
      flexWrap: 'nowrap',
    }}>
      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
      <DocBreadcrumbs {...props} />
      </div>
      <div style={{ flex: '0 0 auto', marginLeft: '16px' }}>
        <PageActions />
      </div>
    </div>
  );
}
