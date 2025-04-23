import {TokenIcon as Web3Icon} from '@web3icons/react'
import React from "react";

interface Token {
  symbol: string;
}

const TokenIcon: React.FC<Token> = ({symbol}) => {
  return (
    <Web3Icon symbol={symbol} size={32} color="#9ac2c2"/>
  );
}

export default TokenIcon;