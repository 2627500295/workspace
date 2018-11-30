import React from 'react';

const DynamicTag = ({ tag: Tag, ...props }) => <Tag {...props} />;

export default DynamicTag;
