import React from "react";
import {
  Copyright,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white p-4 fixed inset-x-0 bottom-0">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center space-x-1">
          <span>{new Date().getFullYear()} All rights reserved</span>
          <Copyright size={16} />
        </div>
        <div className="space-x-4">
          <a
            href="/privacy-policy"
            className="hover:underline hover:text-gray-600"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="hover:underline hover:text-gray-600"
          >
            Terms of Service
          </a>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <span>Socials:</span>
          <div className="flex flex-row items-center space-x-4">
            <a className="hover:text-gray-600" href="">
              <Facebook />
            </a>
            <a className="hover:text-gray-600" href="">
              <Twitter />
            </a>
            <a className="hover:text-gray-600" href="">
              <Instagram />
            </a>
            <a className="hover:text-gray-600" href="">
              <Linkedin />
            </a>
          </div>
        </div>
        <div>
          <span>
            Contact us:{" "}
            <a className="hover:text-gray-600" href="">
              placeholder@gmail.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
