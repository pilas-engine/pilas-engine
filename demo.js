drawPose(spriter_pose, atlas_data) {
   const render: RenderCtx2D = this;
   const ctx: CanvasRenderingContext2D = render.ctx;
   const images: {[key: string]: HTMLImageElement} = render.images;
   const positions: Float32Array = render.region_vertex_position;
   const texcoords: Float32Array = render.region_vertex_texcoord;
   const triangles: Float32Array = render.region_vertex_triangle;
   spriter_pose.object_array.forEach(function (object: spriter.BaseObject): void {
     switch (object.type) {
     case 'sprite':
       const sprite_object: spriter.SpriteObject = <spriter.SpriteObject>object;
       const folder: spriter.Folder = spriter_pose.data.folder_array[sprite_object.folder_index];
       if (!folder) { return; }
       const image_file: spriter.ImageFile = <spriter.ImageFile>(folder.file_array[sprite_object.file_index]);
       if (!image_file) { return; }
       const site: atlas.Site = atlas_data && atlas_data.sites[image_file.name];
       const page: atlas.Page = site && site.page;
       const image_key: string = (page && page.name) || image_file.name;
       const image: HTMLImageElement = images[image_key];
       if (image && image.complete) {
         ctx.save();
         ctxApplySpace(ctx, sprite_object.world_space);
         ctx.scale(image_file.width / 2, image_file.height / 2);
         ctxApplyAtlasSitePosition(ctx, site);
         ctx.globalAlpha *= sprite_object.alpha;
         ctxDrawImageMesh(ctx, triangles, positions, texcoords, image, site, page);
         ctx.restore();
       }
       break;
     case 'entity':
       const entity_object: spriter.EntityObject = <spriter.EntityObject>object;
       ctx.save();
       ctxApplySpace(ctx, entity_object.world_space);
       render.drawPose(entity_object.pose, atlas_data); // recursive
       ctx.restore();
       break;
     }
   });
 }
