"use client";

import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Archive, Broadcast } from "@phosphor-icons/react";
import { UI_DATA } from "../constants";
import HeaderSection from "./HeaderSection";
import BioModule from "../BioModule";
import ActionButton from "../ActionButton";
import ProjectsModule from "./ProjectsModule";
import ToolkitModule from "../ToolkitModule";

const DesktopView = React.memo(() => {
  const navigate = useNavigate();
  return (
    <div className="relative mt-4 flex h-full w-full max-w-5xl flex-col gap-3 p-8">
      <HeaderSection />
      {/* Changed h-96 to min-h-[22rem] to avoid forcing a stretched vertical size */}
      <div className="mt-4 grid min-h-[22rem] grid-cols-12 gap-3">
        <div className="col-span-12 flex flex-col gap-3 md:col-span-5">
          <BioModule />
          <div className="flex flex-1 gap-4">
            <ActionButton
              label="Blog"
              icon={Archive}
              sublabel="Index_Status: 0x00"
              onClick={() =>
                window.open("https://blog.pixlized.net/index/", "_blank")
              }
              variant="blog"
            />
            <ActionButton
              label="Music"
              icon={Broadcast}
              sublabel="Stereo_Uplink"
              onClick={() => navigate({ to: "/albums" })}
              variant="music"
            />
          </div>
        </div>
        <ProjectsModule onClick={() => navigate({ to: "/projects" })} />
      </div>

      <ToolkitModule items={UI_DATA.toolkit} />
    </div>
  );
});

DesktopView.displayName = "DesktopView";

export default DesktopView;
