import React from 'react';
import GitHubLogo from '../assets/images/GitHub_Logo.png';
import LanguageSelector from '../i18n/LanguageSelector';

const Footer = () => {
  return (
    <div className="bottom-0 w-full max-w-none mx-auto p-2 text-xs h-[7vh] text-center flex flex-row justify-end content-center align-middle shadow-inner">
      <LanguageSelector></LanguageSelector>
      <a
        href="https://github.com/milacs/Reparo-Web"
        target="_blank"
        className="h-fit my-auto mx-4 hover:bg-gray-200 p-2 rounded-md"
      >
        <img src={GitHubLogo} className="w-12 aspect-auto" />
      </a>
    </div>
  );
};

export default Footer;
