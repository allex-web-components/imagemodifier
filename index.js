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
  ImageModifierElement.prototype.onLoaded = function (evnt) {
    ImgElement.prototype.onLoaded.call(this, evnt);
    this.$element.css('display', 'block').css('max-width', '100%');
    if (this.cropper) {
      this.cropper.destroy();
    }
    this.cropper = new Cropper(this.$element[0], this.getConfigVal('cropper')||{});
  };

  applib.registerElementType ('ImageModifierElement', ImageModifierElement);
})(ALLEX);
