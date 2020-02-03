(function (execlib) {
  'use strict';
  var lib = execlib.lib;
  var lR = execlib.execSuite.libRegistry;
  var applib = lR.get('allex_applib'),
    ImgElement = applib.getElementType('ImgElement');

  function ImageModifierElement (id, options) {
    ImgElement.call(this, id, options);
    this.cropper = null;
  }
  lib.inherit(ImageModifierElement, ImgElement);
  ImageModifierElement.prototype.__cleanUp = function () {
    if (this.cropper) {
      this.cropper.destroy();
    }
    this.cropper = null;
    ImgElement.prototype.__cleanUp.call(this);
  };
  ImageModifierElement.prototype.onImgLoaded = function (evnt) {
    this.set('edit', false);
    this.$element.css('display', 'block').css('max-width', '100%');
    ImgElement.prototype.onImgLoaded.call(this, evnt);
  };
  ImageModifierElement.prototype.onImgError = function (evnt) {
    this.set('edit', false);
    ImgElement.prototype.onImgError.call(this, evnt);
  };
  ImageModifierElement.prototype.get_edit = function () {
    return !!this.cropper;
  };
  ImageModifierElement.prototype.set_edit = function (edit) {
    if (this.cropper) {
      this.cropper.destroy();
    }
    this.cropper = null;
    if (!edit) {
      return true;
    }
    if (!this.cropper) {
      this.cropper = new Cropper(this.$element[0], this.getConfigVal('cropper')||{});
    }
    return true;
  };

  applib.registerElementType ('ImageModifierElement', ImageModifierElement);
})(ALLEX);
