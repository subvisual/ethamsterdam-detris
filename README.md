# ethamsterdam-detris

Monorepo for the 2022 ETHAmsterdam DeTris project

This repo contains submodules for the three main repos we worked on during the ETHAmsterdam 2022.

`detris-wasm` contains a WebAssembly implementation of the classic Tetris game

`detris-frontend` is the repo for the frontend part of our project, developed in Svelte and Vite. It handles interactions with the contract and displays the NFTs

`detris-contracts` is where we developed our Smart Contracts using Solidity, Foundry and Nix

`storeDirectory.mjs` this file uses the [NFT.Storage](https://nft.storage/) file API to upload our NFT Assets and metadata
