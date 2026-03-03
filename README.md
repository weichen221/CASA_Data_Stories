I.Introduction
 This project is a  interactive web map built with React, Vite, and Mapbox GL JS to explore PTAL values across London at the MSOA level. The goal is simply to give users(especially planners) an easy way to hover over areas, search by MSOA21CD, and instantly see the PTAL score and basic information for each zone. 

II.DataSet
 The PTAL values come from TfL’s published datasets, and the MSOA boundaries come from the ONS 2021 generalised clipped boundary files. I merged the PTAL attributes with the MSOA geometries and uploaded the result as a tileset in Mapbox Studio, which the front‑end loads directly.

 The styling is kept simple , which is why everything lives in a single index.css instead of splitting styles across multiple component‑specific files. The same idea applies to why most of the map logic is placed inside a single custom hook (useMapbox.js). Mapbox GL JS has a lot of event handling and spreading that across multiple components would make the project harder to maintain/ edit. 

III.Limitatio& Conclusion
 There are still some  limitations. PTAL is a static indicator and doesn’t reflect time‑of‑day changes or real‑time transport conditions, so the map can only show a simplified picture of accessibility. I also considered adding a new layer within transpotation system (station/bus stops/cycle lane), but the PTLA
 is a comperhentive  index which evaluate those as a whole, so, it is hard to put all thses elemnts in one sigle map and give out clear information at the same time.

 The search function relies on MSOA IDs, which aren’t intuitive for most users even with autocomplete(So it is  more suitable for those whom have planning background, rather than for all). The UI is functional but basic, and the map doesn’t yet support richer interactions like filtering, comparing areas, or switching between different datasets.