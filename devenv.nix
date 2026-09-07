{ pkgs, inputs, ... }:

let
  pkgs-unstable = import inputs.nixpkgs-unstable { system = pkgs.stdenv.system; };
in
{
  packages = with pkgs-unstable; [
    gleam
    beamMinimal27Packages.erlang
    beamMinimal27Packages.rebar3

    inotify-tools
  ];

  languages.javascript.enable = true;
  languages.javascript.pnpm.enable = true;
}

