{ pkgs, lib, config, inputs, ... }:

{
dotenv.enable = true;

  packages = [ pkgs.bun ];

}
