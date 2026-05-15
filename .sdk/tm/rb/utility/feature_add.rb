# Argentofx SDK utility: feature_add
module ArgentofxUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
